import * as React from 'react';
import { Search, Trash2, Pencil, ExternalLink, Users, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { fetchJobs, deleteJob, type JobPostingDB } from '@/lib/api';
import { cn } from '@/lib/utils';

export function JobPostingsList() {
  const [jobs, setJobs] = React.useState<JobPostingDB[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [deleteTarget, setDeleteTarget] = React.useState<JobPostingDB | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const loadJobs = React.useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '공고 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await deleteJob(deleteTarget.NoticeID);
      setJobs(prev => prev.filter(j => j.NoticeID !== deleteTarget.NoticeID));
      setDeleteTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredJobs = React.useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    const query = searchQuery.toLowerCase();
    return jobs.filter(
      job =>
        job.InstitutionName.toLowerCase().includes(query) ||
        job.Title.toLowerCase().includes(query)
    );
  }, [jobs, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '접수중':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case '예정':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case '마감':
        return 'bg-muted text-muted-foreground border-border/50';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="기관명 또는 공고 제목으로 검색..."
          className={cn(
            'w-full pl-10 pr-4 py-3 rounded-lg text-sm',
            'bg-background/50 border border-border/50',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50',
            'transition-all duration-200'
          )}
        />
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="bg-red-500/10 border-red-500/20">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400 text-sm">{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">공고 목록을 불러오는 중...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredJobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-medium text-foreground mb-1">
            {searchQuery ? '검색 결과가 없습니다' : '등록된 공고가 없습니다'}
          </p>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? '다른 검색어로 시도해보세요' : '첫 번째 공고를 등록해보세요'}
          </p>
        </div>
      )}

      {/* Job List */}
      {!isLoading && filteredJobs.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            총 <span className="text-foreground font-medium">{filteredJobs.length}</span>건
          </p>

          {filteredJobs.map(job => (
            <Card
              key={job.NoticeID}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-200 group"
            >
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {job.InstitutionName}
                      </span>
                      <Badge variant="outline" className={cn('border text-xs', getStatusColor(job.Status))}>
                        {job.Status}
                      </Badge>
                      {job.IsIntern && (
                        <Badge variant="outline" className="border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs">
                          인턴
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {job.Title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                      <span>
                        📅 {job.RegistrationDate} ~ {job.ClosingDate}
                      </span>
                      {job.Headcount && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {job.Headcount}명
                        </span>
                      )}
                      <span>{job.RecruitType}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {job.OriginalPDFUrl && (
                      <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                        <a href={job.OriginalPDFUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-blue-400"
                      onClick={() => {
                        // TODO: Implement edit modal/flow
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-red-400"
                      onClick={() => setDeleteTarget(job)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isDeleting && setDeleteTarget(null)}
          />

          {/* Dialog */}
          <Card className="relative z-10 w-full max-w-md bg-card border-border shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">공고 삭제</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(null)}
                  disabled={isDeleting}
                  className="text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Separator className="mb-4" />

              <p className="text-sm text-muted-foreground mb-2">
                다음 공고를 정말 삭제하시겠습니까?
              </p>
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 mb-6">
                <p className="text-sm font-medium text-foreground">{deleteTarget.Title}</p>
                <p className="text-xs text-muted-foreground mt-1">{deleteTarget.InstitutionName}</p>
              </div>

              <Alert className="bg-yellow-500/5 border-yellow-500/20 mb-6">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-200/80 text-sm">
                  이 작업은 되돌릴 수 없습니다.
                </AlertDescription>
              </Alert>

              <div className="flex items-center gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDeleteTarget(null)}
                  disabled={isDeleting}
                >
                  취소
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-500"
                >
                  {isDeleting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      삭제 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      삭제
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
