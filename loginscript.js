import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = "https://bulvtqcdmkzztesxjjpt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bHZ0cWNkbWt6enRlc3hqanB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODcyMzEsImV4cCI6MjA3NTE2MzIzMX0.ZxK9kRefeiQyqZQS7zU6J1Y2CM0zd_tMAfwLi7nDB5g";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) {
    console.error('loginForm introuvable dans le DOM.');
    return;
  }

  // zone d'erreur affichée sous le formulaire
  let errEl = document.getElementById('loginErrorBox');
  if (!errEl) {
    errEl = document.createElement('div');
    errEl.id = 'loginErrorBox';
    errEl.style.color = '#ff6b6b';
    errEl.style.marginTop = '8px';
    form.appendChild(errEl);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errEl.textContent = '';

    const username = (document.getElementById('username')?.value || '').trim();
    const password = (document.getElementById('password')?.value || '');

    if (!username || !password) {
      errEl.textContent = 'Remplis tous les champs.';
      return;
    }

    try {
      // Vérifie username + password directement dans la DB (mot de passe en clair)
      const { data, error } = await supabase
        .from('Comptes')                
        .select('username, email, rank')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) {
        
        console.warn('Supabase:', error);
        errEl.textContent = 'Nom d’utilisateur ou mot de passe incorrect.';
        return;
      }

      if (!data) {
        errEl.textContent = 'Nom d’utilisateur ou mot de passe incorrect.';
        return;
      }

      
      conesst userSsion = {
        username: data.username,
        email: data.email || '',
        rank: data.rank || 'Citoyen',
        loggedAt: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(userSession));

      
      window.location.href = '/main.html';
    } catch (err) {
      console.error('Erreur inattendue lors du login :', err);
      errEl.textContent = 'Erreur serveur — réessaie plus tard.';
    }
  });
});
