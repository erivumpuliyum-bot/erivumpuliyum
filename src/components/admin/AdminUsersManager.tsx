import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Trash2, Shield, User } from 'lucide-react';

interface AdminUser {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
  email?: string;
}

const AdminUsersManager = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);

    // Fetch all admin users
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('role', 'admin')
      .order('created_at', { ascending: true });

    if (error) {
      toast.error('Failed to fetch admin users');
      return;
    }

    setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemoveAdmin = async (userId: string) => {
    if (userId === currentUserId) {
      toast.error('You cannot remove your own admin privileges');
      return;
    }

    if (!confirm('Are you sure you want to remove admin privileges from this user?')) return;

    const { error } = await supabase
      .from('user_roles')
      .update({ role: 'user' })
      .eq('user_id', userId);

    if (error) {
      toast.error('Failed to update user role');
      return;
    }

    toast.success('Admin privileges removed');
    fetchUsers();
  };

  if (loading) {
    return <div className="text-center py-12">Loading admin users...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Admin Users</h2>
        <p className="text-muted-foreground">Manage administrator access</p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> The first registered user automatically becomes an admin. 
          You can only remove admin privileges from other admins, not from yourself.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border">
          <p className="text-muted-foreground">No admin users found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="card-kerala p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        Admin User {index + 1}
                      </h3>
                      {user.user_id === currentUserId && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">You</span>
                      )}
                      {index === 0 && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 px-2 py-0.5 rounded">
                          First Admin
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Added: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {user.user_id !== currentUserId && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveAdmin(user.user_id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Admin
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-card border rounded-lg p-4">
        <h3 className="font-semibold mb-2">How Admin Access Works</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• The first user to register automatically becomes an admin</li>
          <li>• All subsequent users are regular users by default</li>
          <li>• Only admins can access the admin panel</li>
          <li>• Admins can remove other admins but not themselves</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminUsersManager;
