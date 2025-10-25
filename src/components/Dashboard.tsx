import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, BookOpen } from "lucide-react";
import { toast } from "sonner";
import LabRecordForm from "./LabRecordForm";
import RecordsList from "./RecordsList";

interface Profile {
  name: string;
  roll_number: string;
  department: string;
}

interface LabRecord {
  id: string;
  student_name: string;
  roll_number: string;
  department: string;
  subject: string;
  date: string;
  experiment_number: string;
  aim: string;
  tools: string | null;
  theory: string | null;
  code: string | null;
  output: string | null;
  conclusion: string | null;
  created_at: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [records, setRecords] = useState<LabRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<LabRecord | null>(null);
  const [activeTab, setActiveTab] = useState("create");

  useEffect(() => {
    loadProfile();
    loadRecords();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
      } else {
        setProfile(data);
      }
    }
  };

  const loadRecords = async () => {
    const { data, error } = await supabase
      .from("lab_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading records:", error);
      toast.error("Failed to load records");
    } else {
      setRecords(data || []);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
  };

  const handleEdit = (record: LabRecord) => {
    setEditingRecord(record);
    setActiveTab("create");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("lab_records").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete record");
    } else {
      toast.success("Record deleted successfully");
      loadRecords();
    }
  };

  const handleSaveComplete = () => {
    loadRecords();
    setEditingRecord(null);
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <header className="bg-card shadow-glow border-b border-primary/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 gradient-primary rounded-xl shadow-glow animate-pulse">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Lab Mate</h1>
                {profile && <p className="text-sm text-muted-foreground">Welcome back, {profile.name}! 👋</p>}
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="create">
              {editingRecord ? "Edit Record" : "Create Record"}
            </TabsTrigger>
            <TabsTrigger value="records">My Records ({records.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <LabRecordForm
              profile={profile}
              editingRecord={editingRecord}
              onSaveComplete={handleSaveComplete}
              onCancelEdit={handleCancelEdit}
            />
          </TabsContent>

          <TabsContent value="records">
            <RecordsList
              records={records}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
