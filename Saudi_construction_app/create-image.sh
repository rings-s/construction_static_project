#!/bin/bash
# create-images.sh

echo "🖼️ Creating missing image files..."

# Create directories
mkdir -p static/images/features
mkdir -p static/images/benefits
mkdir -p static/images/case-studies

# Features images
touch static/images/features/traffic-flow-analysis.jpg
touch static/images/features/intersection-studies.jpg
touch static/images/features/speed-volume-studies.jpg
touch static/images/features/safety-assessment.jpg
touch static/images/features/behavior-surveys.jpg
touch static/images/features/data-analytics.jpg
touch static/images/features/vehicle-detection.jpg
touch static/images/features/variable-signs.jpg
touch static/images/features/traffic-control.jpg
touch static/images/features/traveler-info.jpg
touch static/images/features/motorway-control.jpg
touch static/images/features/urban-routing.jpg
touch static/images/features/temporary-traffic.jpg
touch static/images/features/permanent-redirection.jpg
touch static/images/features/control-systems.jpg
touch static/images/features/part-time-management.jpg
touch static/images/features/signage-systems.jpg
touch static/images/features/travel-analysis.jpg
touch static/images/features/collision-analysis.jpg
touch static/images/features/site-investigation.jpg
touch static/images/features/driver-behavior.jpg
touch static/images/features/safety-design.jpg
touch static/images/features/safety-audit.jpg
touch static/images/features/cost-benefit.jpg
touch static/images/features/junction-optimization.jpg
touch static/images/features/model-calibration.jpg
touch static/images/features/data-analysis.jpg
touch static/images/features/network-modelling.jpg
touch static/images/features/demand-forecasting.jpg
touch static/images/features/microsimulation.jpg
touch static/images/features/traffic-assessment.jpg
touch static/images/features/multi-modal.jpg
touch static/images/features/network-analysis.jpg
touch static/images/features/sidra-modeling.jpg
touch static/images/features/mitigation-measures.jpg
touch static/images/features/policy-compliance.jpg
touch static/images/features/sustainable-bus.jpg
touch static/images/features/cycling-network.jpg
touch static/images/features/walking-paths.jpg
touch static/images/features/charging-stations.jpg
touch static/images/features/smart-green-tech.jpg
touch static/images/features/urban-landscaping.jpg
touch static/images/features/renewable-energy.jpg
touch static/images/features/material-recycling.jpg
touch static/images/features/parking-design.jpg
touch static/images/features/layout-reconfig.jpg
touch static/images/features/multi-storey.jpg
touch static/images/features/route-management.jpg
touch static/images/features/service-areas.jpg
touch static/images/features/parking-surveys.jpg
touch static/images/features/phased-plans.jpg
touch static/images/features/event-traffic.jpg
touch static/images/features/safety-plans.jpg
touch static/images/features/emergency-traffic.jpg
touch static/images/features/traffic-diversion.jpg
touch static/images/features/monitoring-systems.jpg
touch static/images/features/documentation.jpg
touch static/images/features/junction-design.jpg
touch static/images/features/highway-design.jpg
touch static/images/features/roundabout-design.jpg
touch static/images/features/traffic-signals.jpg
touch static/images/features/safety-features.jpg
touch static/images/features/geometric-design.jpg
touch static/images/features/pavement-design.jpg
touch static/images/features/drainage-systems.jpg

# Benefits images
touch static/images/benefits/network-efficiency.jpg
touch static/images/benefits/data-driven-decisions.jpg
touch static/images/benefits/safety-enhancement.jpg
touch static/images/benefits/traffic-flow.jpg
touch static/images/benefits/realtime-info.jpg
touch static/images/benefits/innovative-solutions.jpg
touch static/images/benefits/comprehensive-solutions.jpg
touch static/images/benefits/integrated-initiatives.jpg
touch static/images/benefits/enhanced-travel.jpg
touch static/images/benefits/data-analysis.jpg
touch static/images/benefits/casualty-reduction.jpg
touch static/images/benefits/tailored-solutions.jpg
touch static/images/benefits/cost-time-savings.jpg
touch static/images/benefits/robust-reports.jpg
touch static/images/benefits/custom-solutions.jpg
touch static/images/benefits/vision-2030.jpg
touch static/images/benefits/modal-shift.jpg
touch static/images/benefits/global-expertise.jpg
touch static/images/benefits/safe-design.jpg
touch static/images/benefits/peak-demand.jpg
touch static/images/benefits/global-experience.jpg
touch static/images/benefits/minimal-disruption.jpg
touch static/images/benefits/saudi-compliance.jpg
touch static/images/benefits/quick-response.jpg
touch static/images/benefits/saudi-standards.jpg
touch static/images/benefits/climate-expertise.jpg
touch static/images/benefits/advanced-technology.jpg

# Case studies images
touch static/images/case-studies/jubail-industrial-assessment.jpg
touch static/images/case-studies/riyadh-traffic-assessment.jpg
touch static/images/case-studies/jeddah-makkah-highway.jpg
touch static/images/case-studies/riyadh-traffic-model.jpg
touch static/images/case-studies/jeddah-junction-simulation.jpg
touch static/images/case-studies/dammam-industrial-model.jpg
touch static/images/case-studies/riyadh-cycling.jpg
touch static/images/case-studies/jeddah-electric-bus.jpg
touch static/images/case-studies/neom-sustainable.jpg
touch static/images/case-studies/riyadh-new.jpg
touch static/images/case-studies/riyadh-highway.jpg

# Also create og-image
touch static/og-image.jpg

echo "✅ Created all missing image files!"
echo "📁 Files created in:"
echo "   - static/images/features/ ($(ls static/images/features/ | wc -l) files)"
echo "   - static/images/benefits/ ($(ls static/images/benefits/ | wc -l) files)"
echo "   - static/images/case-studies/ ($(ls static/images/case-studies/ | wc -l) files)"
echo "   - static/og-image.jpg"