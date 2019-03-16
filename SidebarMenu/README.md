# SidebarMenu

Компонент бокового меню. Написан на React и расчитан на работу с React Router и Font Awesome. Навеяно [этим шаблоном](http://themetrace.com/template/bracket/app/index.html).

[Демо](https://youtu.be/2LICFhMrG-8)

## Зависимости

- classnames
- prop-types
- react
- react-animate-height
- react-dom
- react-router
- react-router-dom

## Пример использования

```javascript
import SidebarMenu from 'path/to/SidebarMenu';


const menuItems = [
  { key: 'main', icon: 'fas fa-home', label: 'Главная панель', link: '/' },
  { key: 'files', icon: 'fas fa-bug', label: 'Файлы', link: '/samples' },
  { key: 'tags', icon: 'fas fa-tags', label: 'Теги', link: '/tags' },
  {
    key: 'themes',
    icon: 'fas fa-pen',
    label: 'Оформление',
    link: '/themes',
    disabled: true,
    subItems: [
      { key: 'light', label: 'Светлая', link: '/themes/light' },
      { key: 'dark', label: 'Темная', link: '/themes/dark' }
    ]
  },
  {
    key: 'langs',
    icon: 'fas fa-language',
    label: 'Языки',
    link: '/langs',
    disabled: true,
    subItems: [
      { key: 'ru', label: 'Русский', link: '/langs/ru' },
      { key: 'en', label: 'Английский', link: '/langs/en' },
      { key: 'ch', label: 'Китайский', link: '/langs/ch' }
    ]
  },
  { key: 'uploads', icon: 'fas fa-cloud-upload-alt', label: 'Загрузки', link: '/uploads' },
];

<SidebarMenu 
    collapsed={this.state.collapsed} 
    title='Навигация' 
    items={menuItems}
/>

```
