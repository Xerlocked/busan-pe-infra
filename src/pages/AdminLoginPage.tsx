import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { setAdminToken, isAuthenticated } from '@/lib/api';
import { cn } from '@/lib/utils';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    // Simulate small delay for UX
    await new Promise(resolve => setTimeout(resolve, 400));

    setAdminToken(password);
    setIsLoading(false);
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-primary/20 border border-blue-500/20 mb-6 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
            관리자 로그인
          </h1>
          <p className="text-muted-foreground">
            PIA 관리자 대시보드에 접속합니다
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl shadow-blue-500/5">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Warning Alert */}
              <Alert className="bg-yellow-500/5 border-yellow-500/20 text-yellow-200">
                <Lock className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-200/80 text-sm">
                  이 페이지는 관리자 전용입니다
                </AlertDescription>
              </Alert>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-sm font-medium text-foreground">
                  관리자 비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    autoFocus
                    className={cn(
                      'w-full pl-10 pr-12 py-3 rounded-lg text-sm',
                      'bg-background/50 border border-border/50',
                      'text-foreground placeholder:text-muted-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50',
                      'transition-all duration-200'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <Alert className="bg-red-500/10 border-red-500/20">
                  <AlertDescription className="text-red-400 text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-primary hover:from-blue-500 hover:to-blue-600 text-white font-medium transition-all duration-200 shadow-lg shadow-blue-500/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    인증 중...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    로그인
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          부울경 공기업 전산직 가이드 · 관리 시스템
        </p>
      </div>
    </div>
  );
}
