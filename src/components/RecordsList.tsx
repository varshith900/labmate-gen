import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, FileText, Calendar } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LabRecord {
  id: string;
  student_name: string;
  roll_number: string;
  department: string;
  subject: string;
  date: string;
  experiment_number: string;
  aim: string;
  created_at: string;
}

interface Props {
  records: LabRecord[];
  onEdit: (record: LabRecord) => void;
  onDelete: (id: string) => void;
}

export default function RecordsList({ records, onEdit, onDelete }: Props) {
  if (records.length === 0) {
    return (
      <Card className="shadow-elegant">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Records Yet</h3>
          <p className="text-muted-foreground text-center">
            Start by creating your first lab record using the "Create Record" tab.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {records.map((record) => (
        <Card key={record.id} className="shadow-elegant card-hover border-primary/10">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-1">
                  Exp {record.experiment_number}: {record.subject}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(record.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Name:</span> {record.student_name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Roll:</span> {record.roll_number}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Dept:</span> {record.department}
              </p>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground line-clamp-2">{record.aim}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={() => onEdit(record)} variant="outline" size="sm" className="flex-1">
                <Edit2 className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Record</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this lab record? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(record.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
