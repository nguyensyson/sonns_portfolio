// ===== Projects data =====
// Each entry renders as a .project-card on the DỰ ÁN grid.
// image: seeded placeholder photo (deterministic "random" per project, swap with a real screenshot later).
// link: URL for "Xem chi tiết" — replace with the real repo/demo link when available.
const PROJECTS_DATA = [
  {
    image: 'https://picsum.photos/seed/cloud-migration-platform/800/600',
    name: 'Cloud Migration Platform',
    desc: 'Di chuyển hệ thống on-premise lên AWS với hạ tầng dạng code, giảm 35% chi phí vận hành.',
    tech: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
    link: '#projects',
  },
  {
    image: 'https://picsum.photos/seed/cicd-pipeline-automation/800/600',
    name: 'CI/CD Pipeline Automation',
    desc: 'Xây dựng pipeline tự động build – test – deploy đa môi trường cho 6 team phát triển.',
    tech: ['Jenkins', 'GitHub Actions', 'Ansible'],
    link: '#projects',
  },
  {
    image: 'https://picsum.photos/seed/ecommerce-backend-microservices/800/600',
    name: 'E-commerce Backend Microservices',
    desc: 'Thiết kế hệ thống microservices xử lý đơn hàng thời gian thực với Kafka.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'MySQL'],
    link: '#projects',
  },
  {
    image: 'https://picsum.photos/seed/monitoring-observability-stack/800/600',
    name: 'Monitoring & Observability Stack',
    desc: 'Triển khai stack giám sát tập trung cho toàn bộ cluster production.',
    tech: ['Prometheus', 'Grafana', 'ELK'],
    link: '#projects',
  },
];
