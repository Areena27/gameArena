import { useState, useEffect } from "react";
import { Card, InputField, Button, Toast, Loader } from "@/components/common/uiComponents";
import { gameAPI } from "@/services/api";
import { Typography, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { GENRES } from "@/constants/genres";
import { useRouter } from "next/router";

export function UploadGameForm({ onSuccess }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    genre: "action",
    gameFile: null,
  });

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      // Load game data for editing
      loadGameData(id);
    }
  }, [router.query]);

  const loadGameData = async (gameId) => {
    setLoading(true);
    try {
      const response = await gameAPI.listDeveloperGames();
      const game = response.data?.find((g) => g._id === gameId);
      if (game) {
        setFormData({
          title: game.title || "",
          desc: game.desc || "",
          genre: game.genre || "action",
        });
      }
    } catch (err) {
      setError("Failed to load game data");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title?.trim() || !formData.desc?.trim() || !formData.genre) {
      setError("All fields are required");
      setShowToast(true);
      return;
    }

    if (formData.desc.length < 8) {
      setError("Description must be at least 8 characters");
      setShowToast(true);
      return;
    }

    if (formData.desc.length > 500) {
      setError("Description must be less than 500 characters");
      setShowToast(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { id } = router.query;
      let response;
      
      if (id) {
        response = await gameAPI.updateGame(id, {
          title: formData.title.trim(),
          desc: formData.desc.trim(),
          genre: formData.genre,
        });
      } else {
        const gamePayload = {
          title: formData.title.trim(),
          desc: formData.desc.trim(),
          genre: formData.genre,
        };
        
        // If file is selected, add it to the payload
        if (formData.gameFile) {
          gamePayload.gameFile = formData.gameFile;
        }
        
        response = await gameAPI.createGame(gamePayload);
      }

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err) {
      setError(err.message || "Failed to save game");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader fullscreen />}
      <Card>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <InputField
            label="Game Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter game title"
            error={error && !formData.title ? error : null}
            required
          />

          <InputField
            label="Description"
            value={formData.desc}
            onChange={(e) => handleChange("desc", e.target.value)}
            placeholder="Describe your game..."
            error={
              error && formData.desc
                ? formData.desc.length < 8
                  ? "Description must be at least 8 characters"
                  : formData.desc.length > 500
                  ? "Description must be less than 500 characters"
                  : null
                : null
            }
            helperText="8-500 characters"
            multiline
            rows={5}
            required
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
              Upload Game File
            </Typography>
            <input
              type="file"
              accept=".zip,.rar,.7z,.exe,.html,.js"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleChange("gameFile", file);
                }
              }}
              style={{ display: "none" }}
              id="game-file-upload"
            />
            <label htmlFor="game-file-upload">
              <Button
                component="span"
                label={formData.gameFile ? formData.gameFile.name : "Browse Files"}
                variant="secondary"
                sx={{ width: "100%", justifyContent: "flex-start" }}
              />
            </label>
            {formData.gameFile && (
              <Typography variant="caption" sx={{ color: "text.secondary", ml: 1 }}>
                Selected: {formData.gameFile.name} ({(formData.gameFile.size / 1024 / 1024).toFixed(2)} MB)
              </Typography>
            )}
          </Box>

          <FormControl fullWidth required>
            <InputLabel>Genre</InputLabel>
            <Select
              value={formData.genre}
              label="Genre"
              onChange={(e) => handleChange("genre", e.target.value)}
            >
              {GENRES.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button
              label={loading ? "Saving..." : router.query.id ? "Update Game" : "Submit Game"}
              onClick={handleSubmit}
              disabled={loading}
              type="submit"
              sx={{ flex: 1 }}
            />
            <Button
              label="Cancel"
              variant="secondary"
              onClick={() => router.push("/developer/dashboard")}
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>

        {showToast && error && (
          <Toast
            message={error}
            type="error"
            onClose={() => setShowToast(false)}
          />
        )}
      </Card>
    </>
  );
}

