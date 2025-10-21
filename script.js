(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log("Example data:", array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  // === Com2_1.1 (razem z Com2_1.2 & Com2_2.2) ===
  cw1.addEventListener("click", function() {
    answer.innerHTML = '<h1>Loading...</h1>';

    const fetchPromise = fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
    const delayPromise = new Promise(resolve => setTimeout(resolve, 1500));

    Promise.all([fetchPromise, delayPromise])
      .then(([posts]) => {
        // === Com2_2.2: Wyświetlanie wszystkich danych w konsoli ===
        console.log("=== CW1: Wszystkie posty (Com2_2.2) ===");
        console.log(posts);
        console.log("=== CW1: Wybrane dane (pierwsze 3 tytuły) ===");
        posts.slice(0, 3).forEach(post => {
          console.log(`ID: ${post.id}, Tytuł: ${post.title}`);
        });
        // ========================================================

        // Generowanie treści HTML (z poprawkami styli do Com2_2.1)
        let htmlContent = '<h2>Wszystkie posty (Stylizacja + Konsola)</h2><ul>';

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
      });
  })

  // === Com2_1.3 & Com2_2.2 ===
  cw2.addEventListener("click", function() {
    const postId = 1;
    answer.innerHTML = `<h3>Pobieranie pojedynczego postu ID: ${postId}...</h3>`;

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Post nie znaleziony lub błąd sieci');
        }
        return response.json();
      })
      .then(post => {
        // === Com2_2.2: Wyświetlanie danych w konsoli ===
        console.log("=== CW2: Pojedynczy post (Com2_2.2) ===");
        console.log(post);
        // ===============================================

        // Wyświetlanie pojedynczego postu (teraz ostylowanego Com2_2.1)
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

  // === Com2_1.4 (razem z Com2_2.2) ===
  cw3.addEventListener("click", function() {
    // Do wysłania
    const newPostData = {
      title: 'Nowy post od Użytkownika',
      body: 'To jest treść nowo utworzonego posta metodą POST.',
      userId: 1,
    };

    answer.innerHTML = '<h1>Processing...</h1>';

    const delay = new Promise(resolve => setTimeout(resolve, 1500));

    // Wysyłanie żądania POST
    const postPromise = fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPostData),
    }).then(response => response.json());

    Promise.all([postPromise, delay])
      .then(([post]) => {
        // === Com2_2.2: Wyświetlanie odpowiedzi POST w konsoli ===
        console.log("=== CW3: Odpowiedź POST (Nowy post, Com2_2.2) ===");
        console.log(post);
        // ========================================================

        // 2. Wyświetlenie komunikatu z ID nowego postu
        answer.innerHTML = `
<h2>Sukces!</h2>
<p>Dodano nowy post o <strong>ID = ${post.id}</strong></p>
<div style="border: 1px dashed green; padding: 10px; margin-top: 15px; background-color: #d4edda; border-radius: 4px;">
<p><strong>Zwrócone dane:</strong></p>
<p><strong>Tytuł:</strong> ${post.title}</p>
<p><strong>Body:</strong> ${post.body}</p>
</div>
`;
        console.log('Nowy post utworzony:', post);
      })
      .catch(error => {
        console.error('Błąd podczas wysyłania postu:', error);
        answer.innerHTML = `<p style="color: red;">Błąd podczas wysyłania postu. Spróbuj ponownie.</p>`;
      });
  })

})();