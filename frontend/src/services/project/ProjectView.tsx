import * as React from "react";
import { Project } from "../../types/types";
import api from "../../api/api";
import { Box, Button, Label, Input, Textarea, Flex } from "theme-ui";
import { useParams } from "react-router-dom";

const ProjectView: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    api.get(`/projects/${id}`).then(res => {
      setProject(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!project) return;
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSave = async () => {
    if (!project) return;
    setSaving(true);
    try {
      await api.put(`/projects/${id}`, project);
      alert("Project updated successfully!");
    } catch (err) {
      console.error("Error saving project", err);
      alert("Error saving project");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading || !project) return <p>Loading...</p>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" value={project.title} onChange={handleChange} mb={3} />

      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={project.description}
        onChange={handleChange}
        rows={5}
        mb={3}
      />

      <Label htmlFor="deadline">Deadline</Label>
      <Input
        id="deadline"
        name="deadline"
        type="date"
        value={project.deadline?.substring(0, 10) || ""}
        onChange={handleChange}
        mb={3}
      />

      <Label>Created By: {project.userId}</Label>

      <Flex sx={{ diplay: "flex", justifyContent: "space-around", w: "100%", mt: 4, gap: 2 }}>
        <Button onClick={handleBack} variant="secondary">
          Back
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </Flex>
    </Box>
  );
};

export default ProjectView;
