
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, UserPlus, UserMinus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserWithRoles {
  id: string;
  email: string;
  created_at: string;
  roles: string[];
}

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>("guest");
  const [processingUser, setProcessingUser] = useState<string | null>(null);

  // Fetch users and their roles
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || !isAdmin) return;
      
      try {
        // Fetch users (only IDs and emails)
        const { data: authUsers, error: usersError } = await supabase.auth.admin.listUsers();
        
        if (usersError) throw usersError;
        
        if (!authUsers?.users) {
          setUsers([]);
          setIsLoadingUsers(false);
          return;
        }
        
        // Map users and fetch their roles
        const usersWithRoles = await Promise.all(
          authUsers.users.map(async (authUser) => {
            // Fetch roles for this user
            const { data: rolesData, error: rolesError } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", authUser.id);
              
            if (rolesError) {
              console.error("Error fetching roles for user", authUser.id, rolesError);
              return {
                id: authUser.id,
                email: authUser.email || "Sin correo",
                created_at: authUser.created_at,
                roles: [],
              };
            }
            
            return {
              id: authUser.id,
              email: authUser.email || "Sin correo",
              created_at: authUser.created_at,
              roles: rolesData.map(r => r.role),
            };
          })
        );
        
        setUsers(usersWithRoles);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios",
          variant: "destructive",
        });
      } finally {
        setIsLoadingUsers(false);
      }
    };
    
    fetchUsers();
  }, [user, isAdmin, toast]);
  
  // Handle role management
  const updateUserRole = async (userId: string, role: string, action: 'add' | 'remove') => {
    setProcessingUser(userId);
    
    try {
      const { error } = await supabase.functions.invoke('updateUserRole', {
        body: { userId, role, action },
      });
      
      if (error) throw error;
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(u => {
          if (u.id === userId) {
            const roles = action === 'add'
              ? [...u.roles, role]
              : u.roles.filter(r => r !== role);
              
            return { ...u, roles };
          }
          return u;
        })
      );
      
      toast({
        title: "Rol actualizado",
        description: `Rol ${action === 'add' ? 'agregado' : 'eliminado'} correctamente`,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el rol del usuario",
        variant: "destructive",
      });
    } finally {
      setProcessingUser(null);
    }
  };
  
  // Redirect if not an admin
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, isLoading, navigate]);
  
  if (isLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto pt-28 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-gray-500 mb-8">Gestiona usuarios y sus roles</p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Usuarios</h2>
            
            <div className="flex items-center gap-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guest">Huésped</SelectItem>
                  <SelectItem value="host">Anfitrión</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoadingUsers ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Fecha de registro</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        No hay usuarios registrados
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map(role => (
                              <span 
                                key={role} 
                                className={`text-xs px-2 py-1 rounded-full ${
                                  role === 'admin' 
                                    ? 'bg-red-100 text-red-800' 
                                    : role === 'host'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {role === 'admin' ? 'Administrador' : role === 'host' ? 'Anfitrión' : 'Huésped'}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {user.roles.includes(selectedRole) ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateUserRole(user.id, selectedRole, 'remove')}
                              disabled={processingUser === user.id}
                            >
                              {processingUser === user.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <UserMinus className="h-4 w-4 mr-1" />
                                  Quitar rol
                                </>
                              )}
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateUserRole(user.id, selectedRole, 'add')}
                              disabled={processingUser === user.id}
                            >
                              {processingUser === user.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  Agregar rol
                                </>
                              )}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
