import * as React from "react";
import { Task } from "../../../types/types";
import api from "../../../api/api";
import { Box, Button, Label, Input, Textarea, Flex } from "theme-ui";
import { useParams } from "react-router-dom";

const TaskView: React.FC = () => {
  const { id } = useParams();
  const [task, setTask] = React.useState<Task | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    api.get(`/tasks/${id}`).then(res => {
      setTask(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!task) return;
    setTask({ ...task, [name]: value });
  };

  const handleSave = async () => {
    if (!task) return;
    setSaving(true);
    try {
      await api.put(`/tasks/${id}`, task);
      alert("Task updated successfully!");
    } catch (err) {
      console.error("Error saving task", err);
      alert("Error saving task");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${id}`);
      alert("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task", err);
      alert("Error deleting task");
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading || !task) return <p>Loading...</p>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Label htmlFor="projectId">Project ID</Label>
      <Input
        id="projectId"
        name="projectId"
        type="number"
        value={task.projectId}
        onChange={handleChange}
        mb={3}
      />

      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" value={task.title} onChange={handleChange} mb={3} />

      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={task.description}
        onChange={handleChange}
        rows={4}
        mb={3}
      />

      <Label htmlFor="status">Status</Label>
      <Input id="status" name="status" value={task.status} onChange={handleChange} mb={3} />

      <Label htmlFor="startDate">Start Date</Label>
      <Input
        id="startDate"
        name="startDate"
        type="datetime-local"
        sx={{
          color: "white",
          "::-webkit-calendar-picker-indicator": {
            filter: "invert(1)",
          },
        }}
        value={task.startDate?.substring(0, 16) || ""}
        onChange={handleChange}
        mb={3}
      />

      <Label htmlFor="durationInDays">Duration (in days)</Label>
      <Input
        id="durationInDays"
        name="durationInDays"
        type="number"
        value={task.durationInDays}
        onChange={handleChange}
        mb={3}
      />

      <Label htmlFor="reporter">Reporter</Label>
      <Input id="reporter" name="reporter" value={task.reporter} onChange={handleChange} mb={3} />

      <Label htmlFor="assignee">Assignee</Label>
      <Input
        id="assignee"
        name="assignee"
        value={task.assignee || ""}
        onChange={handleChange}
        mb={3}
      />

      <Flex sx={{ justifyContent: "space-around", w: "100%", mt: 4, gap: 2 }}>
        <Button onClick={() => handleBack()} variant="secondary">
          Back
        </Button>
        <Button onClick={() => handleSave()} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button onClick={() => handleDelete()} variant="danger">
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default TaskView;
