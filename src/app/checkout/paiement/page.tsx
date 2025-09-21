"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  alpha,
  useTheme
} from "@mui/material";
import {
  Payment as PaymentIcon,
  Security as SecurityIcon,
  CreditCardOff as CreditCardOffIcon,
  SupportAgent as SupportIcon,
  Check as CheckIcon
} from "@mui/icons-material";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentTestPage() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    if (!res.ok) {
      alert("Erreur lors de la création de la session Stripe.");
      setLoading(false);
      return;
    }

    const { id } = await res.json();
    const stripe = await stripePromise;

    const { error } = await stripe!.redirectToCheckout({ sessionId: id });

    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header />
      
      <Container component="main" sx={{ py: 8, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 450, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
          <CardHeader 
            title="Test de Paiement Sécurisé"
            subheader="Transaction sécurisée via Stripe"
            sx={{
              textAlign: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              py: 3,
              "& .MuiCardHeader-subheader": {
                color: alpha(theme.palette.common.white, 0.8)
              }
            }}
          />
          
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <PaymentIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </Box>
            </Box>
            
            <Box sx={{ bgcolor: 'primary.50', borderRadius: 1, p: 2, mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">Produit:</Typography>
                <Typography variant="body1" fontWeight="medium">Abonnement Premium</Typography>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">Prix:</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">19,99 €</Typography>
              </Box>
            </Box>
            
            <List dense sx={{ mb: 4 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SecurityIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Paiement 100% sécurisé" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <CreditCardOffIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Aucune information bancaire stockée" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SupportIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Support 7j/7" />
              </ListItem>
            </List>
            
            <CardActions sx={{ px: 0 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCheckout}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
              >
                {loading ? "Redirection vers Stripe..." : "Procéder au paiement"}
              </Button>
            </CardActions>
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
              En cliquant sur ce bouton, vous serez redirigé vers la plateforme de paiement sécurisé Stripe.
            </Typography>
          </CardContent>
        </Card>
      </Container>
      
      <Footer />
    </Box>
  );
}