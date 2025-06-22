// src/lib/config/images.js
export const SERVICE_IMAGES = {
    // Transport Planning Services
    'site-access': '/images/services/site-access.jpg',
    'transport-feasibility': '/images/services/transport-feasibility.jpg',
    'master-planning': '/images/services/master-planning.jpg',
    'technical-rebuttals': '/images/services/technical-rebuttals.jpg',
    'transport-statement': '/images/services/transport-statement.jpg',
    'travel-plan': '/images/services/travel-plan.jpg',
  
    // Traffic Engineering Services
    'traffic-modeling': '/images/services/traffic-modeling.jpg',
    'traffic-assessment': '/images/services/traffic-assessment.jpg',
    'traffic-impact': '/images/services/traffic-impact.jpg',
    'its-systems': '/images/services/its-systems.jpg',
    'road-safety': '/images/services/road-safety.jpg',
    'traffic-management': '/images/services/traffic-management.jpg',
    'swept-path': '/images/services/swept-path.jpg',
  
    // Highway Engineering Services
    'car-park-design': '/images/services/car-park-design.jpg',
    'traffic-management-plans': '/images/services/traffic-management-plans.jpg',
    'highway-junction': '/images/services/highway-junction.jpg',
    'sustainable-transport': '/images/services/sustainable-transport.jpg',
  
    // Additional Services
    'industry-assessment': '/images/services/industry-assessment.jpg',
    'public-consultation': '/images/services/public-consultation.jpg'
  };
  
  export const PROJECT_IMAGES = {
    // Featured Projects
    'highway-interchange': '/images/projects/highway-interchange.jpg',
    'smart-traffic-system': '/images/projects/smart-traffic-system.jpg',
    'sustainable-corridor': '/images/projects/sustainable-corridor.jpg',
    'urban-planning': '/images/projects/urban-planning.jpg',
    'metro-system': '/images/projects/metro-system.jpg',
    'car-park-complex': '/images/projects/car-park-complex.jpg',
    'junction-redesign': '/images/projects/junction-redesign.jpg',
    'traffic-signals': '/images/projects/traffic-signals.jpg'
  };
  
  export const BACKGROUND_IMAGES = {
    'construction-site': '/images/backgrounds/construction-site.jpg',
    'highway-aerial': '/images/backgrounds/highway-aerial.jpg',
    'traffic-intersection': '/images/backgrounds/traffic-intersection.jpg',
    'smart-city': '/images/backgrounds/smart-city.jpg',
    'engineering-team': '/images/backgrounds/engineering-team.jpg'
  };
  
  // Helper function to get service image
  export function getServiceImage(serviceKey) {
    return SERVICE_IMAGES[serviceKey] || '/images/services/default-service.jpg';
  }
  
  // Helper function to get project image
  export function getProjectImage(projectKey) {
    return PROJECT_IMAGES[projectKey] || '/images/projects/default-project.jpg';
  }
  
  // Helper function to get background image
  export function getBackgroundImage(backgroundKey) {
    return BACKGROUND_IMAGES[backgroundKey] || '/images/backgrounds/default-bg.jpg';
  }