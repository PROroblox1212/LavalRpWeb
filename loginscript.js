import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://bulvtqcdmkzztesxjjpt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bHZ0cWNkbWt6enRlc3hqanB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODcyMzEsImV4cCI6MjA3NTE2MzIzMX0.ZxK9kRefeiQyqZQS7zU6J1Y2CM0zd_tMAfwLi7nDB5g"
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Remplis tous les champs !");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("Comptes")
                .select("username, password, email, rank")
                .eq("username", username)
                .eq("password", password)
                .single();

            if (error || !data) {
                alert("Nom d’utilisateur ou mot de passe incorrect !");
                return;
            }

            // Connexion réussie
            console.log("✅ Connecté :", data);
            localStorage.setItem("user", JSON.stringify({
                username: data.username,
                email: data.email,
                rank: data.rank
            }));

            // Redirection
            window.location.href = "/main.html";

        } catch (err) {
            console.error("Erreur login :", err);
            alert("Erreur serveur — réessaie plus tard.");
        }
    });
});
