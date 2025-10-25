import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Save, FileText, Printer, X } from "lucide-react";
import RecordPreview from "./RecordPreview";
import { exportToWord, exportToPDF } from "@/lib/export";

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
}

interface Props {
  profile: Profile | null;
  editingRecord: LabRecord | null;
  onSaveComplete: () => void;
  onCancelEdit: () => void;
}

export default function LabRecordForm({ profile, editingRecord, onSaveComplete, onCancelEdit }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    department: "",
    subject: "",
    date: new Date().toISOString().split("T")[0],
    experimentNumber: "",
    aim: "",
    tools: "",
    theory: "",
    code: "",
    output: "",
    conclusion: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        studentName: profile.name,
        rollNumber: profile.roll_number,
        department: profile.department,
      }));
    }
  }, [profile]);

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        studentName: editingRecord.student_name,
        rollNumber: editingRecord.roll_number,
        department: editingRecord.department,
        subject: editingRecord.subject,
        date: editingRecord.date,
        experimentNumber: editingRecord.experiment_number,
        aim: editingRecord.aim,
        tools: editingRecord.tools || "",
        theory: editingRecord.theory || "",
        code: editingRecord.code || "",
        output: editingRecord.output || "",
        conclusion: editingRecord.conclusion || "",
      });
    }
  }, [editingRecord]);

  const handleSave = async () => {
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be logged in");
      setSaving(false);
      return;
    }

    const recordData = {
      user_id: user.id,
      student_name: formData.studentName,
      roll_number: formData.rollNumber,
      department: formData.department,
      subject: formData.subject,
      date: formData.date,
      experiment_number: formData.experimentNumber,
      aim: formData.aim,
      tools: formData.tools || null,
      theory: formData.theory || null,
      code: formData.code || null,
      output: formData.output || null,
      conclusion: formData.conclusion || null,
    };

    let error;

    if (editingRecord) {
      const result = await supabase
        .from("lab_records")
        .update(recordData)
        .eq("id", editingRecord.id);
      error = result.error;
    } else {
      const result = await supabase.from("lab_records").insert([recordData]);
      error = result.error;
    }

    if (error) {
      toast.error("Failed to save record");
      console.error(error);
    } else {
      toast.success(editingRecord ? "Record updated successfully!" : "Record saved successfully!");
      resetForm();
      onSaveComplete();
    }

    setSaving(false);
  };

  const resetForm = () => {
    setFormData({
      studentName: profile?.name || "",
      rollNumber: profile?.roll_number || "",
      department: profile?.department || "",
      subject: "",
      date: new Date().toISOString().split("T")[0],
      experimentNumber: "",
      aim: "",
      tools: "",
      theory: "",
      code: "",
      output: "",
      conclusion: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="shadow-glow border-primary/10 gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary">📋</span> Student Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experimentNumber">Experiment Number</Label>
                <Input
                  id="experimentNumber"
                  value={formData.experimentNumber}
                  onChange={(e) => setFormData({ ...formData, experimentNumber: e.target.value })}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-glow border-primary/10 gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary">🔬</span> Experiment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aim">Aim</Label>
              <Textarea
                id="aim"
                rows={3}
                value={formData.aim}
                onChange={(e) => setFormData({ ...formData, aim: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tools">Tools/Software Required</Label>
              <Textarea
                id="tools"
                rows={2}
                value={formData.tools}
                onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theory">Theory</Label>
              <Textarea
                id="theory"
                rows={4}
                value={formData.theory}
                onChange={(e) => setFormData({ ...formData, theory: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                rows={8}
                className="font-mono text-sm"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="output">Output</Label>
              <Textarea
                id="output"
                rows={4}
                value={formData.output}
                onChange={(e) => setFormData({ ...formData, output: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conclusion">Conclusion</Label>
              <Textarea
                id="conclusion"
                rows={3}
                value={formData.conclusion}
                onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-glow border-primary/10 gradient-card">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setShowPreview(!showPreview)} variant="outline" className="flex-1">
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button onClick={handleSave} disabled={saving} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : editingRecord ? "Update" : "Save"}
              </Button>
              <Button onClick={() => exportToWord(formData)} variant="secondary" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Export Word
              </Button>
              <Button onClick={() => exportToPDF(formData)} variant="secondary" className="flex-1">
                <Printer className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              {editingRecord && (
                <Button onClick={handleCancel} variant="destructive" className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  Cancel Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showPreview && (
        <div className="lg:sticky lg:top-8 h-fit">
          <RecordPreview formData={formData} />
        </div>
      )}
    </div>
  );
}
