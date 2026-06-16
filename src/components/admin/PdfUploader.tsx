import * as React from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parsePdf, type ParsedJobData } from '@/lib/api';
import { cn } from '@/lib/utils';

interface PdfUploaderProps {
  onParsed: (data: ParsedJobData) => void;
  isLoading: boolean;
}

export function PdfUploader({ onParsed, isLoading }: PdfUploaderProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [progressMessage, setProgressMessage] = React.useState('대기 중...');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('PDF 파일만 업로드할 수 있습니다.');
      return;
    }

    setSelectedFile(file);
    setError('');
    setProgress(0);
    setProgressMessage('시작하는 중...');

    try {
      const result = await parsePdf(file, (status, percentage) => {
        setProgressMessage(status);
        setProgress(percentage);
      });
      
      // Brief delay to show 100% before transitioning
      setTimeout(() => {
        onParsed(result);
      }, 500);
    } catch (err) {
      setProgress(0);
      setProgressMessage('');
      setError(err instanceof Error ? err.message : 'PDF 파싱 중 오류가 발생했습니다.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError('');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer',
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-border/50 hover:border-primary/50 hover:bg-primary/5',
          isLoading && 'pointer-events-none opacity-60'
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center py-16 px-6">
          {isLoading ? (
            <>
              {/* Loading State */}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
              <p className="text-lg font-semibold text-foreground mb-1">
                {progressMessage}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                S3 업로드 및 AI 처리를 진행하고 있습니다
              </p>
              {/* Progress bar */}
              <div className="w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(progress)}% 완료
              </p>
            </>
          ) : selectedFile ? (
            <>
              {/* File Selected State */}
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-lg font-semibold text-foreground mb-1">
                {selectedFile.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="mt-3 text-muted-foreground hover:text-red-400"
              >
                <X className="w-4 h-4 mr-1" />
                파일 제거
              </Button>
            </>
          ) : (
            <>
              {/* Default State */}
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors',
                isDragOver ? 'bg-primary/20' : 'bg-primary/10'
              )}>
                <Upload className={cn(
                  'w-8 h-8 transition-colors',
                  isDragOver ? 'text-primary' : 'text-primary/70'
                )} />
              </div>
              <p className="text-lg font-semibold text-foreground mb-1">
                채용공고 PDF를 업로드하세요
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                드래그 앤 드롭하거나 클릭하여 파일을 선택하세요
              </p>
              <Button variant="outline" size="sm" className="pointer-events-none">
                <Upload className="w-4 h-4 mr-2" />
                파일 선택
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="bg-red-500/10 border-red-500/20">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400 text-sm">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
