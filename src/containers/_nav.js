export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Master Data']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tata Persuratan',
    route: '/master-data',
    icon: 'cil-envelope-open',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Surat Masuk',
        to: '/master-data/surat-masuk',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Surat Keluar',
        to: '/master-data/surat-keluar',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'List Disposisi',
    route: '/disposisi',
    icon: 'cil-envelope-open',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'List Disposisi',
        to: '/disposisi/saya',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Request Surat',
    to: '/request-surat',
    icon: 'cil-envelope-open',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Buat Dokument',
    route: '/buat-dokument',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Surat Keputusan (SK)',
        to: '/buat-dokument/sk',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Template Variabel',
        to: '/buat-dokument/variabel',
      },
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Konfigurasi']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Konfigurasi Aplikasi',
    to: '/konfig/aplikasi',
    icon: 'cil-settings',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Konfigurasi User',
    to: '/konfig/user',
    icon: 'cil-people',
  },
  
]

