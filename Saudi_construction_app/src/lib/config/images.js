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
    'highway-engineering': '/images/services/highway-engineering.jpg',
    'pavement-design': '/images/services/pavement-design.jpg',
    'bridge-design': '/images/services/bridge-design.jpg',
    'drainage-systems': '/images/services/drainage-systems.jpg',
  
    // Additional Services
    'industry-assessment': '/images/services/industry-assessment.jpg',
    'public-consultation': '/images/services/public-consultation.jpg',
    
    // Service Features Images
    'space-optimization': '/images/features/space-optimization.jpg',
    'smart-parking': '/images/features/smart-parking.jpg',
    'safety-security': '/images/features/safety-security.jpg',
    'sustainable-design': '/images/features/sustainable-design.jpg',
    'accessibility': '/images/features/accessibility.jpg',
    'traffic-flow': '/images/features/traffic-flow.jpg',
    'construction-management': '/images/features/construction-management.jpg',
    'planning-documentation': '/images/features/planning-documentation.jpg',
    'flow-optimization': '/images/features/flow-optimization.jpg',
    'safety-protocols': '/images/features/safety-protocols.jpg',
    'impact-assessment': '/images/features/impact-assessment.jpg',
    'signal-coordination': '/images/features/signal-coordination.jpg',
    'intersection-design': '/images/features/intersection-design.jpg',
    'interchange-design': '/images/features/interchange-design.jpg',
    'signal-optimization': '/images/features/signal-optimization.jpg',
    'pedestrian-integration': '/images/features/pedestrian-integration.jpg',
    'geometric-analysis': '/images/features/geometric-analysis.jpg',
    'capacity-analysis': '/images/features/capacity-analysis.jpg',
    'green-infrastructure': '/images/features/green-infrastructure.jpg',
    'electric-vehicle': '/images/features/electric-vehicle.jpg',
    'active-transport': '/images/features/active-transport.jpg',
    'stormwater-management': '/images/features/stormwater-management.jpg',
    'circular-economy': '/images/features/circular-economy.jpg',
    'carbon-reduction': '/images/features/carbon-reduction.jpg',



    // Additional service images for transport planning
    'route-planning': '/images/services/route-planning.jpg',
    'feasibility-analysis': '/images/services/feasibility-analysis.jpg',
    'site-assessment': '/images/services/site-assessment.jpg',
    'success-metrics': '/images/services/success-metrics.jpg',


    // site-access
    'site-access-excellence': '/images/services/site-access-excellence.jpg',




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
    'traffic-signals': '/images/projects/traffic-signals.jpg',
    'downtown-commercial': '/images/projects/downtown-commercial.jpg',
    'hospital-parking': '/images/projects/hospital-parking.jpg',
    'university-campus': '/images/projects/university-campus.jpg',
    'bridge-reconstruction': '/images/projects/bridge-reconstruction.jpg',
    'highway-widening': '/images/projects/highway-widening.jpg',
    'utility-installation': '/images/projects/utility-installation.jpg',
    'freeway-interchange': '/images/projects/freeway-interchange.jpg',
    'urban-intersection': '/images/projects/urban-intersection.jpg',
    'roundabout-conversion': '/images/projects/roundabout-conversion.jpg',
    'green-corridor': '/images/projects/green-corridor.jpg',
    'sustainable-mobility': '/images/projects/sustainable-mobility.jpg',
    'eco-industrial': '/images/projects/eco-industrial.jpg',

    // Case studies images  
    'torrington-dwelling': '/images/case-studies/torrington-dwelling.jpg',
    'colchester-commercial': '/images/case-studies/colchester-commercial.jpg',
    'australia-hospital': '/images/case-studies/australia-hospital.jpg',
        
  };
  
  export const BACKGROUND_IMAGES = {
    'construction-site': '/images/backgrounds/construction-site.jpg',
    'highway-aerial': '/images/backgrounds/highway-aerial.jpg',
    'traffic-intersection': '/images/backgrounds/traffic-intersection.jpg',
    'smart-city': '/images/backgrounds/smart-city.jpg',
    'engineering-team': '/images/backgrounds/engineering-team.jpg',
    'highway-construction': '/images/backgrounds/highway-construction.jpg',
    'urban-development': '/images/backgrounds/urban-development.jpg',
    'sustainable-transport-bg': '/images/backgrounds/sustainable-transport.jpg'
  };



  export const FEATURE_IMAGES = {
    // Site Access Features
    'site-access-design': '/images/features/site-access-design.jpg',
    'visibility-analysis': '/images/features/visibility-analysis.jpg',
    'swept-path-analysis': '/images/features/swept-path-analysis.jpg',
    'safety-assessment': '/images/features/safety-assessment.jpg',
    'due-diligence': '/images/features/due-diligence.jpg',
    'capacity-analysis': '/images/features/capacity-analysis.jpg',
    
    // ... add more feature images as needed
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