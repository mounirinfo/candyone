"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import {
  Phone as PhoneIcon,
  FitnessCenter as FitnessIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon
} from "@mui/icons-material";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";

const Sky = "#ddf9ff";
const Cyan = "#40a2ff";
const Pink = "#ff48b0";

export default function DashboardPage() {
  const [callbacks, setCallbacks] = useState<any[]>([]);
  const [abonnements, setAbonnements] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Callbacks pour coach ou admin
        const resCoach = await fetch("/api/coach");
        const dataCoach = await resCoach.json();
        setCallbacks(Array.isArray(dataCoach) ? dataCoach : []);

        // Vérification rôle administrateur
        const resAdmin = await fetch("/api/administrateur");
        const dataAdmin = await resAdmin.json();
        setRole(dataAdmin?.role || null);

        // Si admin, récupérer les abonnements
        if (dataAdmin?.role === "ADMIN_SITE") {
          const resAbos = await fetch("/api/admin");
          const dataAbos = await resAbos.json();
          setAbonnements(Array.isArray(dataAbos) ? dataAbos : []);
        }

      } catch (err) {
        console.error("Erreur lors du fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleStatusChange = async (callbackId: number, oldStatus: string, newStatus: string) => {
    // Mise à jour optimiste de l'interface
    setCallbacks(callbacks.map(cb => 
      cb.id === callbackId ? { ...cb, statut: newStatus } : cb
    ));

    try {
      const response = await fetch("/api/coach", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: callbackId, statut: newStatus }),
      });

      if (!response.ok) {
        // En cas d'erreur, restaurer l'ancien statut
        setCallbacks(callbacks.map(cb => 
          cb.id === callbackId ? { ...cb, statut: oldStatus } : cb
        ));
        alert("Erreur lors de la mise à jour du statut");
      }
    } catch (err) {
      // En cas d'erreur réseau, restaurer l'ancien statut
      setCallbacks(callbacks.map(cb => 
        cb.id === callbackId ? { ...cb, statut: oldStatus } : cb
      ));
      alert("Erreur de connexion lors de la modification");
      console.error("Erreur:", err);
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut?.toLowerCase()) {
      case "actif":
      case "traité":
        return "success";
      case "nouveau":
        return "info";
      case "rendez-vous":
      case "en attente":
        return "warning";
      case "archivé":
      case "expiré":
      case "annulé":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box sx={{ width: '100%', p: 3 }}>
          <LinearProgress sx={{ backgroundColor: Sky, '& .MuiLinearProgress-bar': { backgroundColor: Cyan } }} />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: '#fafafa', minHeight: '100vh', p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: Cyan, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
            <FitnessIcon sx={{ fontSize: 40 }} />
            Dashboard Fitness Club
          </Typography>
        </Box>

        {/* Tableau Callbacks */}
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ backgroundColor: Cyan, color: 'white', p: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon /> Callbacks ({callbacks.length})
              </Typography>
            </Box>

            {callbacks.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">Aucun callback trouvé</Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: Sky }}>Client</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: Sky }}>Contact</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: Sky }}>Message</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: Sky }}>Coach Assigné</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', backgroundColor: Sky }}>Statut</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {callbacks.map((cb) => (
                      <TableRow key={cb.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: Pink, width: 32, height: 32 }}>
                              <PersonIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">{cb.nom}</Typography>
                              <Typography variant="caption" color="text.secondary">{cb.email}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell><Typography variant="body2">{cb.telephone}</Typography></TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {cb.message || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={cb.notes_interne || "Non assigné"}
                            size="small"
                            variant={cb.notes_interne ? "filled" : "outlined"}
                            sx={{ backgroundColor: cb.notes_interne ? Pink + '20' : 'transparent', color: cb.notes_interne ? Pink : 'text.secondary', borderColor: Pink }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip 
                              label={cb.statut || "nouveau"} 
                              size="small" 
                              color={getStatusColor(cb.statut)}
                            />
                            <FormControl size="small">
                              <Select
                                value=""
                                displayEmpty
                                onChange={(e) => handleStatusChange(cb.id, cb.statut, e.target.value)}
                                sx={{
                                  minWidth: 50,
                                  '& .MuiSelect-select': {
                                    padding: '4px 8px',
                                    fontSize: '0.875rem'
                                  }
                                }}
                                renderValue={() => "Modifier"}
                              >
                                <MenuItem value="" disabled>
                                  <em>Changer le statut</em>
                                </MenuItem>
                                <MenuItem value="nouveau">🆕 Nouveau</MenuItem>
                                <MenuItem value="rendez-vous">📅 Rendez-vous</MenuItem>
                                <MenuItem value="traité">✅ Traité</MenuItem>
                                <MenuItem value="archivé">📦 Archivé</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Tableau Abonnements : seulement pour ADMIN_SITE */}
        {role === "ADMIN_SITE" && (
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ backgroundColor: Cyan, color: 'white', p: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FitnessIcon /> Abonnements Actifs ({abonnements.length})
                </Typography>
              </Box>
              {abonnements.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">Aucun abonnement actif</Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: Sky }}>Client</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: Sky }}>Période</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: Sky }}>Statut</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {abonnements.map((abo) => (
                        <TableRow key={abo.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {abo.contrat?.client ? `${abo.contrat.client.prenom} ${abo.contrat.client.nom}` : "Inconnu"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CalendarIcon sx={{ fontSize: 16, color: Cyan }} />
                              <Typography variant="body2">{abo.date_debut} {abo.date_fin && `- ${abo.date_fin}`}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={abo.statut} size="small" color={getStatusColor(abo.statut)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        )}

      </Box>
      <Footer />
    </>
  );
}