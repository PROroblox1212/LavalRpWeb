import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://bulvtqcdmkzztesxjjpt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bHZ0cWNkbWt6enRlc3hqanB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODcyMzEsImV4cCI6MjA3NTE2MzIzMX0.ZxK9kRefeiQyqZQS7zU6J1Y2CM0zd_tMAfwLi7nDB5g"
const supabase = createClient(supabaseUrl, supabaseKey)

document.getElementById("submitbtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const rank = "none" 

    const { data, error } = await supabase
        .from("Comptes")
        .insert([{ username, password, email, rank }])

    if (error) {
        console.log("❌ Erreur :", error)
        alert("Erreur lors de l'ajout du compte.")
    } else {
        console.log("✅ Compte ajouté :", data)
        alert("Compte ajouté avec succès !")
    }
})
