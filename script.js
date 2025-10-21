(function() {
const example = document.getElementById('example')
const cw1 = document.getElementById('cw1')
const cw2 = document.getElementById('cw2')
const cw3 = document.getElementById('cw3')
const answer = document.getElementById('answer')

  // Nowy element: Overlay Popupu
  const loadingOverlay = document.getElementById('loading-overlay');

  // Funkcje pomocnicze do zarządzania popupem
  function showLoading() {
      if (loadingOverlay) {
          loadingOverlay.style.display = 'flex';
          answer.innerHTML = ''; // Czyścimy poprzednią zawartość
      }
  }

  function hideLoading() {
      if (loadingOverlay) {
          loadingOverlay.style.display = 'none';
      }
  }

example.addEventListener("click", function() {
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(array => {
console.log("Example data:", array)
answer.innerHTML = JSON.stringify(array);
})
})

// === Com2_1.1 & Com2_1.2 & Com2_2.2 & Com2_2.3 (Przycisk cw1) ===
cw1.addEventListener("click", function() {
    // === Com2_2.3: Pokaż Popup Loading ===
    showLoading(); 
    // Poprzedni 'answer.innerHTML = Loading...' jest usunięty na rzecz popupu

const fetchPromise = fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
const delayPromise = new Promise(resolve => setTimeout(resolve, 2000)); // Dłuższe opóźnienie dla widoczności popupu

Promise.all([fetchPromise, delayPromise])
.then(([posts]) => {
        // Logowanie (Com2_2.2)
        console.log("=== CW1: Wszystkie posty (Com2_2.2) ===");
        console.log(posts);

// Generowanie treści HTML (Com2_1.1)
let htmlContent = '<h2>Wszystkie posty (Stylizacja + Popup)</h2><ul>';

posts.forEach(post => {
htmlContent += `
<li>
<strong>ID:</strong> ${post.id}<br>
<strong>Tytuł (Title):</strong> ${post.title}<br>
<strong>Treść (Body):</strong> ${post.body}
</li>
<hr>
`;
});

htmlContent += '</ul>';
answer.innerHTML = htmlContent;
})
.catch(error => {
console.error('Błąd podczas pobierania danych:', error);
answer.innerHTML = `<p style="color: red;">Błąd podczas ładowania danych. Spróbuj ponownie.</p>`;
})
      .finally(() => {
          // === Com2_2.3: Ukryj Popup Loading po zakończeniu operacji ===
          hideLoading(); 
      });
})

// === Com2_1.3 & Com2_2.2 (Przycisk cw2) ===
cw2.addEventListener("click", function() {
    // Możemy również użyć popupu tutaj, ale trzymając się minimalnych zmian:
    answer.innerHTML = `<h3>Pobieranie pojedynczego postu ID: 1...</h3>`;

const postId = 1;
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
.then(response => {
if (!response.ok) {
throw new Error('Post nie znaleziony lub błąd sieci');
}
return response.json();
})
.then(post => {
        console.log("=== CW2: Pojedynczy post ===");
        console.log(post);

const htmlContent = `
<div style="border: 1px solid #007bff; padding: 15px; margin-top: 10px; background-color: #e9f5ff; border-radius: 4px;">
<h2>Pojedynczy post (ID: ${post.id})</h2>
<p><strong>ID Użytkownika:</strong> ${post.userId}</p>
<p><strong>Tytuł (Title):</strong> ${post.title}</p>
<p><strong>Treść (Body):</strong> ${post.body}</p>
</div>
`;
answer.innerHTML = htmlContent;
})
.catch(error => {
console.error('Błąd podczas pobierania pojedynczego postu:', error);
answer.innerHTML = `<p style="color: red;">Nie udało się pobrać postu: ${error.message}</p>`;
});
})

// === Com2_1.4 & Com2_2.2 (Przycisk cw3) ===
cw3.addEventListener("click", function() {
// Do wysłania
const newPostData = {
title: 'Nowy post od Użytkownika',
body: 'To jest treść nowo utworzonego posta metodą POST.',
userId: 1,
};

answer.innerHTML = '<h1>Processing...</h1>'; // Zostawiamy 'Processing...' dla przejrzystości zadania 2.1.4

const delay = new Promise(resolve => setTimeout(resolve, 1500)); 

const postPromise = fetch('https://jsonplaceholder.typicode.com/posts', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(newPostData),
}).then(response => response.json());

Promise.all([postPromise, delay])
.then(([post]) => {
        console.log("=== CW3: Odpowiedź POST ===");
        console.log(post);

answer.innerHTML = `
<h2>Sukces!</h2>
<p>Dodano nowy post o <strong>ID = ${post.id}</strong></p>
<div style="border: 1px dashed green; padding: 10px; margin-top: 15px; background-color: #d4edda; border-radius: 4px;">
<p><strong>Zwrócone dane:</strong></p>
<p><strong>Tytuł:</strong> ${post.title}</p>
<p><strong>Body:</strong> ${post.body}</p>
</div>
`;
})
.catch(error => {
console.error('Błąd podczas wysyłania postu:', error);
answer.innerHTML = `<p style="color: red;">Błąd podczas wysyłania postu. Spróbuj ponownie.</p>`;
});
})

})();