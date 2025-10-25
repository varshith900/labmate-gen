import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormData {
  studentName: string;
  rollNumber: string;
  department: string;
  subject: string;
  date: string;
  experimentNumber: string;
  aim: string;
  tools: string;
  theory: string;
  code: string;
  output: string;
  conclusion: string;
}

interface Props {
  formData: FormData;
}

export default function RecordPreview({ formData }: Props) {
  return (
    <Card className="shadow-glow border-primary/10 gradient-card">
      <CardHeader className="text-center border-b border-primary/20">
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Laboratory Record
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Student Name</p>
            <p className="font-medium">{formData.studentName || "—"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Roll Number</p>
            <p className="font-medium">{formData.rollNumber || "—"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Department</p>
            <p className="font-medium">{formData.department || "—"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Subject</p>
            <p className="font-medium">{formData.subject || "—"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Date</p>
            <p className="font-medium">{formData.date || "—"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Experiment No.</p>
            <p className="font-medium">{formData.experimentNumber || "—"}</p>
          </div>
        </div>

        {formData.aim && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-primary border-b pb-1">Aim</h3>
            <p className="text-sm whitespace-pre-wrap">{formData.aim}</p>
          </div>
        )}

        {formData.tools && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-primary border-b pb-1">Tools/Software Required</h3>
            <p className="text-sm whitespace-pre-wrap">{formData.tools}</p>
          </div>
        )}

        {formData.theory && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-primary border-b pb-1">Theory</h3>
            <p className="text-sm whitespace-pre-wrap">{formData.theory}</p>
          </div>
        )}

        {formData.code && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-primary border-b pb-1">Code</h3>
            <pre className="code-block">{formData.code}</pre>
          </div>
        )}

        {formData.output && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-primary border-b pb-1">Output</h3>
            <p className="text-sm whitespace-pre-wrap">{formData.output}</p>
          </div>
        )}

        {formData.conclusion && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-primary border-b pb-1">Conclusion</h3>
            <p className="text-sm whitespace-pre-wrap">{formData.conclusion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
