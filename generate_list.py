import os
import json
from pathlib import Path

def generate_image_list(image_folder='images', output_file='list.json'):
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    image_list = []
    
    # Проверяем существование папки с изображениями
    if not os.path.exists(image_folder):
        print(f"Папка {image_folder} не существует!")
        return
    
    # Проходим по всем файлам в папке
    for filename in os.listdir(image_folder):
        filepath = os.path.join(image_folder, filename)
        if os.path.isfile(filepath) and any(filename.lower().endswith(ext) for ext in image_extensions):
            image_list.append({
                "name": filename,
                "alt": f"Изображение {filename.split('.')[0]}"
            })
    
    # Сохраняем в JSON файл
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(image_list, f, ensure_ascii=False, indent=4)
    
    print(f"Сгенерирован список из {len(image_list)} изображений в файле {output_file}")

if __name__ == "__main__":
    generate_image_list()
