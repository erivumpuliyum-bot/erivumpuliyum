import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import epLogo from '@/assets/ep-logo-full.png';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkAdminAndRedirect = async (userId: string) => {
    const { data: roles, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin');
    
    if (error) {
      console.error('Error checking role:', error);
      toast.error('Error checking admin status');
      return;
    }
    
    if (roles && roles.length > 0) {
      toast.success('Welcome, Admin!');
      navigate('/admin');
    } else {
      toast.error('Access denied. Admin privileges required.');
      await supabase.auth.signOut();
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await checkAdminAndRedirect(session.user.id);
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Use setTimeout to avoid deadlock
        setTimeout(() => {
          checkAdminAndRedirect(session.user.id);
        }, 100);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in.');
          } else {
            toast.error(signUpError.message);
          }
          return;
        }

        if (signUpData.user) {
          toast.success('Account created! Signing you in...');
          
          // Sign in immediately after signup
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) {
            toast.info('Account created. Please sign in.');
            setIsSignUp(false);
          }
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
          return;
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src={epLogo}
              alt="Erivum Puliyum"
              className="h-16 mx-auto mb-4"
            />
            <h1 className="font-display text-2xl font-bold text-gray-800">
              Admin Portal
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              {isSignUp ? 'Create your account' : 'Sign in to manage your restaurant'}
            </p>
            {isSignUp && (
              <p className="text-xs text-green-600 mt-2 bg-green-50 p-2 rounded">
                Note: The first registered user automatically becomes admin
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@epkitchen.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-600 hover:underline font-medium"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
