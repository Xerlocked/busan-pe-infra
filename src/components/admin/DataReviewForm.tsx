import * as React from 'react';
import { Save, FileText, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { type JobPostingDB, type ParsedJobData } from '@/lib/api';
import { cn } from '@/lib/utils';

interface DataReviewFormProps {
  initialData: ParsedJobData;
  onSubmit: (data: JobPostingDB) => void;
  isSubmitting: boolean;
}

export function DataReviewForm({ initialData, onSubmit, isSubmitting }: DataReviewFormProps) {
  const parsed = initialData.parsedData;

  const [formData, setFormData] = React.useState({
    InstitutionName: parsed.InstitutionName || '',
    Title: parsed.Title || '',
    IsIntern: parsed.IsIntern || false,
    RecruitType: parsed.RecruitType || '신입',
    RegistrationDate: parsed.RegistrationDate || '',
    ClosingDate: parsed.ClosingDate || '',
    ExamDate: parsed.ExamDate || '',
    Status: parsed.Status || '예정' as '접수중' | '예정' | '마감',
    Headcount: parsed.Headcount || 0,
    Age: parsed.Requirements?.Age || '',
    Residence: parsed.Requirements?.Residence || '',
    Certificates: parsed.Requirements?.Certificates?.join(', ') || '',
    Notes: parsed.Notes || '',
  });

  const confidence = initialData.confidence;
  const isLowConfidence = confidence < 0.7;

  const updateField = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const jobData: JobPostingDB = {
      NoticeID: parsed.NoticeID || crypto.randomUUID(),
      InstitutionName: formData.InstitutionName,
      Title: formData.Title,
      IsIntern: formData.IsIntern,
      RecruitType: formData.RecruitType,
      RegistrationDate: formData.RegistrationDate,
      ClosingDate: formData.ClosingDate,
      ExamDate: formData.ExamDate || undefined,
      Status: formData.Status as '접수중' | '예정' | '마감',
      Headcount: formData.Headcount || undefined,
      Requirements: {
        Age: formData.Age || undefined,
        Residence: formData.Residence || undefined,
        Certificates: formData.Certificates
          ? formData.Certificates.split(',').map(s => s.trim()).filter(Boolean)
          : undefined,
      },
      OriginalPDFUrl: parsed.OriginalPDFUrl,
      Notes: formData.Notes || undefined,
    };

    onSubmit(jobData);
  };

  const inputClass = cn(
    'w-full px-3 py-2.5 rounded-lg text-sm',
    'bg-background/50 border border-border/50',
    'text-foreground placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50',
    'transition-all duration-200'
  );

  const selectClass = cn(inputClass, 'appearance-none cursor-pointer');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Confidence Score */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">AI 분석 신뢰도</span>
              <Badge
                variant="outline"
                className={cn(
                  'border-0 text-xs',
                  confidence >= 0.9
                    ? 'bg-green-500/10 text-green-400'
                    : confidence >= 0.7
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-red-500/10 text-red-400'
                )}
              >
                {Math.round(confidence * 100)}%
              </Badge>
            </div>
          </div>
          <Progress value={confidence * 100} className="h-2" />

          {isLowConfidence && (
            <Alert className="mt-3 bg-yellow-500/5 border-yellow-500/20">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-200/80 text-sm">
                신뢰도가 낮습니다. 파싱 결과를 꼼꼼히 검토해주세요.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Form Fields */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-6 space-y-5">
          {/* Institution Name */}
          <div className="space-y-2">
            <Label htmlFor="institution-name" className="text-sm font-medium">
              기관명 <span className="text-red-400">*</span>
            </Label>
            <input
              id="institution-name"
              type="text"
              value={formData.InstitutionName}
              onChange={e => updateField('InstitutionName', e.target.value)}
              placeholder="예: 부산교통공사"
              required
              className={inputClass}
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              공고 제목 <span className="text-red-400">*</span>
            </Label>
            <input
              id="title"
              type="text"
              value={formData.Title}
              onChange={e => updateField('Title', e.target.value)}
              placeholder="예: 2026년도 상반기 체험형 인턴 채용공고"
              required
              className={inputClass}
            />
          </div>

          {/* Row: IsIntern + RecruitType */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">인턴 여부</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="is-intern"
                  checked={formData.IsIntern}
                  onCheckedChange={(checked) => updateField('IsIntern', !!checked)}
                />
                <Label htmlFor="is-intern" className="cursor-pointer text-sm text-muted-foreground">
                  체험형/인턴 공고
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recruit-type" className="text-sm font-medium">
                채용 유형
              </Label>
              <select
                id="recruit-type"
                value={formData.RecruitType}
                onChange={e => updateField('RecruitType', e.target.value)}
                className={selectClass}
              >
                <option value="신입">신입</option>
                <option value="경력">경력</option>
                <option value="무관">무관</option>
              </select>
            </div>
          </div>

          {/* Row: Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label htmlFor="reg-date" className="text-sm font-medium">
                접수 시작일 <span className="text-red-400">*</span>
              </Label>
              <input
                id="reg-date"
                type="date"
                value={formData.RegistrationDate}
                onChange={e => updateField('RegistrationDate', e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="close-date" className="text-sm font-medium">
                접수 마감일 <span className="text-red-400">*</span>
              </Label>
              <input
                id="close-date"
                type="date"
                value={formData.ClosingDate}
                onChange={e => updateField('ClosingDate', e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam-date" className="text-sm font-medium">
                시험일
              </Label>
              <input
                id="exam-date"
                type="date"
                value={formData.ExamDate}
                onChange={e => updateField('ExamDate', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Row: Status + Headcount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                상태
              </Label>
              <select
                id="status"
                value={formData.Status}
                onChange={e => updateField('Status', e.target.value as typeof formData.Status)}
                className={selectClass}
              >
                <option value="접수중">접수중</option>
                <option value="예정">예정</option>
                <option value="마감">마감</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="headcount" className="text-sm font-medium">
                채용 인원
              </Label>
              <input
                id="headcount"
                type="number"
                min={0}
                value={formData.Headcount}
                onChange={e => updateField('Headcount', parseInt(e.target.value) || 0)}
                placeholder="0"
                className={inputClass}
              />
            </div>
          </div>

          {/* Requirements Section */}
          <div className="border-t border-border/50 pt-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">지원 요건</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  연령 요건
                </Label>
                <input
                  id="age"
                  type="text"
                  value={formData.Age}
                  onChange={e => updateField('Age', e.target.value)}
                  placeholder="예: 만 18세 이상"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="residence" className="text-sm font-medium">
                  거주지 요건
                </Label>
                <input
                  id="residence"
                  type="text"
                  value={formData.Residence}
                  onChange={e => updateField('Residence', e.target.value)}
                  placeholder="예: 부울경 지역 제한"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificates" className="text-sm font-medium">
                  자격증 (쉼표로 구분)
                </Label>
                <input
                  id="certificates"
                  type="text"
                  value={formData.Certificates}
                  onChange={e => updateField('Certificates', e.target.value)}
                  placeholder="예: 정보처리기사, 정보보안기사"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              비고
            </Label>
            <textarea
              id="notes"
              value={formData.Notes}
              onChange={e => updateField('Notes', e.target.value)}
              placeholder="추가 참고 사항을 입력하세요"
              rows={3}
              className={cn(inputClass, 'resize-none')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Raw Text (Accordion) */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="raw-text" className="border border-border/50 rounded-lg overflow-hidden bg-card/30">
          <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/20">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-muted-foreground" />
              PDF 원본 텍스트 보기
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4">
            <pre className="text-xs text-muted-foreground bg-background/50 p-4 rounded-lg overflow-auto max-h-64 whitespace-pre-wrap font-mono">
              {initialData.rawText || '추출된 텍스트가 없습니다.'}
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {parsed.OriginalPDFUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={parsed.OriginalPDFUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                PDF 원본
              </a>
            </Button>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !formData.InstitutionName || !formData.Title}
          className="h-11 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium shadow-lg shadow-green-500/20"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              저장 중...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              DB에 저장
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
