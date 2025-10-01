    "use client";

    import React, { FormEvent, useState } from "react";
    import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";
    import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    InputAdornment,
    IconButton,
    Alert,
    } from "@mui/material";
    import Header from "@/components/organismes/Header";
    import Footer from "@/components/organismes/Footer";

    export default function ChangePasswordPage() {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedback(null);

        if (formData.newPassword !== formData.confirmPassword) {
        setFeedback({ type: "error", message: "❌ Les mots de passe ne correspondent pas." });
        return;
        }

        setLoading(true);

        try {
        const res = await fetch("/api/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
            }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Erreur serveur");

        setFeedback({ type: "success", message: "✅ Mot de passe changé avec succès !" });
        setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        } catch (err: any) {
        setFeedback({ type: "error", message: err.message });
        } finally {
        setLoading(false);
        }
    };

    const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
        if (field === "old") setShowOldPassword(!showOldPassword);
        if (field === "new") setShowNewPassword(!showNewPassword);
        if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
        {/* HEADER */}
        <Header />

        {/* BACKGROUND + FORM */}
        <Box
            sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: 'url(/fmacaron.jpg)',
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: 6,
            position: "relative",
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 102, 204, 0.1)",
                backdropFilter: "blur(3px)",
            },
            }}
        >
            <Container maxWidth="sm">
            <Paper
                elevation={10}
                sx={{
                borderRadius: 4,
                p: 5,
                bgcolor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 20px 40px rgba(255, 102, 204, 0.25)",
                border: "1px solid rgba(255, 102, 204, 0.2)",
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: "linear-gradient(90deg, #ff66cc, #ff99dd)",
                },
                }}
            >
                {/* Icône décorative */}
                <Box sx={{ textAlign: "center", mb: 2 }}>
                <Box
                    sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1.5,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff99dd, #ff66cc)",
                    color: "white",
                    mb: 2,
                    boxShadow: "0 4px 12px rgba(255, 102, 204, 0.4)",
                    }}
                >
                    <KeyRound size={28} fill="white" />
                </Box>
                </Box>

                <Box textAlign="center" mb={4}>
                <Typography
                    variant="h3"
                    fontWeight="800"
                    sx={{
                    background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                    }}
                >
                    Changer mon mot de passe
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Sécurisez votre compte Candy Body
                </Typography>
                </Box>

                {feedback && (
                <Alert 
                    severity={feedback.type} 
                    sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    "& .MuiAlert-message": {
                        fontWeight: 500,
                    }
                    }}
                >
                    {feedback.message}
                </Alert>
                )}

                <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                    fullWidth
                    required
                    name="oldPassword"
                    label="Ancien mot de passe"
                    type={showOldPassword ? "text" : "password"}
                    value={formData.oldPassword}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Lock size={20} color="#ff66cc" />
                        </InputAdornment>
                        ),
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle old password visibility"
                            onClick={() => togglePasswordVisibility("old")}
                            edge="end"
                            sx={{ color: "#ff66cc" }}
                            >
                            {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                            borderColor: "#ff66cc",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#ff66cc",
                            boxShadow: "0 0 0 2px rgba(255, 102, 204, 0.2)",
                        },
                        },
                    }}
                    />

                    <TextField
                    fullWidth
                    required
                    name="newPassword"
                    label="Nouveau mot de passe"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Lock size={20} color="#ff66cc" />
                        </InputAdornment>
                        ),
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle new password visibility"
                            onClick={() => togglePasswordVisibility("new")}
                            edge="end"
                            sx={{ color: "#ff66cc" }}
                            >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                            borderColor: "#ff66cc",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#ff66cc",
                            boxShadow: "0 0 0 2px rgba(255, 102, 204, 0.2)",
                        },
                        },
                    }}
                    />

                    <TextField
                    fullWidth
                    required
                    name="confirmPassword"
                    label="Confirmer le nouveau mot de passe"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Lock size={20} color="#ff66cc" />
                        </InputAdornment>
                        ),
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() => togglePasswordVisibility("confirm")}
                            edge="end"
                            sx={{ color: "#ff66cc" }}
                            >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                            borderColor: "#ff66cc",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#ff66cc",
                            boxShadow: "0 0 0 2px rgba(255, 102, 204, 0.2)",
                        },
                        },
                    }}
                    />

                    <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: 2,
                        py: 1.5,
                        fontSize: "1.1rem",
                        boxShadow: "0 6px 12px rgba(255, 102, 204, 0.4)",
                        "&:hover": {
                        background: "linear-gradient(135deg, #ff4dc4, #ff80d5)",
                        boxShadow: "0 8px 16px rgba(255, 102, 204, 0.5)",
                        transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                        "&:disabled": {
                        background: "rgba(255, 102, 204, 0.5)",
                        transform: "none",
                        boxShadow: "none",
                        },
                    }}
                    >
                    {loading ? "Changement en cours..." : "Changer le mot de passe"}
                    </Button>
                </Stack>
                </form>

                <Box textAlign="center" mt={3}>
                <Typography variant="body2" color="text.secondary">
                    🔒 Votre sécurité est notre priorité
                </Typography>
                </Box>
            </Paper>
            </Container>
        </Box>

        {/* FOOTER */}
        <Footer />
        </>
    );
    }