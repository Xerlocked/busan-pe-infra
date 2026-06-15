import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, FilePlus, ListChecks, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { PdfUploader } from '@/components/admin/PdfUploader';
import { DataReviewForm } from '@/components/admin/DataReviewForm';
import { JobPostingsList } from '@/components/admin/JobPostingsList';
import { clearAdminToken, isAuthenticated, createJob, type ParsedJobData, type JobPostingDB } from '@/lib/api';
import { cn } from '@/lib/utils';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [parsedData, setParsedData] = React.useState<ParsedJobData | null>(null);
  const [isParsing, setIsParsing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  // Auth check
  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  const handleParsed = (data: ParsedJobData) => {
    setParsedData(data);
    setIsParsing(false);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (data: JobPostingDB) => {
    setIsSubmitting(true);
    try {
      await createJob(data);
      setSubmitSuccess(true);
      setParsedData(null);

      // Auto-clear success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      // Error is handled via alert in the form
      console.error('Failed to create job:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetUpload = () => {
    setParsedData(null);
    setIsParsing(false);
    setSubmitSuccess(false);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-primary/20 border border-blue-500/20 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">관리자 대시보드</h1>
              <p className="text-sm text-muted-foreground">PIA 채용공고 관리 시스템</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-red-400 hover:border-red-400/50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>

        <Separator className="mb-8" />

        {/* Tabs */}
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="bg-muted/30 border border-border/50 p-1 h-auto">
            <TabsTrigger
              value="create"
              className={cn(
                'px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
                'transition-all duration-200'
              )}
            >
              <FilePlus className="w-4 h-4 mr-2" />
              공고 등록
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className={cn(
                'px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
                'transition-all duration-200'
              )}
            >
              <ListChecks className="w-4 h-4 mr-2" />
              공고 관리
            </TabsTrigger>
          </TabsList>

          {/* Tab: Create New Posting */}
          <TabsContent value="create" className="space-y-6">
            {/* Success Message */}
            {submitSuccess && (
              <Alert className="bg-green-500/10 border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400">
                  공고가 성공적으로 등록되었습니다!
                </AlertDescription>
              </Alert>
            )}

            {!parsedData ? (
              <>
                {/* Step 1: Upload PDF */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        1
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">PDF 업로드</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      채용공고 PDF를 업로드하면 AI가 자동으로 데이터를 추출합니다.
                    </p>
                    <PdfUploader onParsed={handleParsed} isLoading={isParsing} />
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Step 2: Review & Edit */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      2
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">데이터 검토 및 수정</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetUpload}
                    className="text-muted-foreground"
                  >
                    다시 업로드
                  </Button>
                </div>
                <DataReviewForm
                  initialData={parsedData}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </>
            )}
          </TabsContent>

          {/* Tab: Manage Postings */}
          <TabsContent value="manage">
            <JobPostingsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
