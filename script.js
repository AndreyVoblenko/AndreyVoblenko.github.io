document.addEventListener('DOMContentLoaded', function() {
    // Папка с изображениями (можно изменить на нужную)
    const imageFolder = './images/';
    
    // Получаем контейнер для галереи
    const gallery = document.getElementById('imageGallery');
    
    // Функция для загрузки изображений
    function loadImages() {
        // Этот код будет работать на GitHub Pages
        // Он предполагает, что у вас есть файл list.json с информацией об изображениях
        fetch('list.json')
            .then(response => response.json())
            .then(images => {
                gallery.innerHTML = ''; // Очищаем контейнер
                
                images.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageFolder + image.name;
                    imgElement.alt = image.alt || 'Изображение';
                    
                    // Добавляем обработчик клика для открытия в модальном окне
                    imgElement.addEventListener('click', function() {
                        openModal(imgElement.src);
                    });
                    
                    gallery.appendChild(imgElement);
                });
            })
            .catch(error => {
                console.error('Ошибка загрузки изображений:', error);
                gallery.innerHTML = '<p>Не удалось загрузить изображения.</p>';
            });
    }
    
    // Функция для открытия модального окна с изображением
    function openModal(src) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <span class="close">&times;</span>
            <img class="modal-content" src="${src}">
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        // Закрытие модального окна
        modal.querySelector('.close').onclick = function() {
            document.body.removeChild(modal);
        };
        
        // Закрытие при клике вне изображения
        modal.onclick = function(event) {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        };
    }
    
    // Загружаем изображения при загрузке страницы
    loadImages();
});
