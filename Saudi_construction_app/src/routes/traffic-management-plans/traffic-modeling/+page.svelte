<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { BarChart3, Cpu, Target, Zap, Settings, TrendingUp } from 'lucide-svelte';

	const features = [
		{
			icon: BarChart3,
			title: "Advanced Microsimulation",
			description: "State-of-the-art traffic microsimulation using SUMO, VISSIM, and other industry-leading platforms."
		},
		{
			icon: Cpu,
			title: "AI-Powered Analytics",
			description: "Machine learning algorithms for pattern recognition, demand forecasting, and optimization."
		},
		{
			icon: Target,
			title: "Scenario Planning",
			description: "Comprehensive analysis of multiple scenarios including growth projections and infrastructure changes."
		},
		{
			icon: Zap,
			title: "Real-Time Integration",
			description: "Integration with live traffic data feeds for dynamic model calibration and validation."
		},
		{
			icon: Settings,
			title: "Multi-Modal Modeling",
			description: "Comprehensive modeling of all transport modes including pedestrians, cyclists, and public transport."
		},
		{
			icon: TrendingUp,
			title: "Predictive Analytics",
			description: "Advanced forecasting capabilities for long-term planning and infrastructure investment decisions."
		}
	];

	const benefits = [
		"Optimize traffic signal timing and coordination",
		"Evaluate infrastructure improvement options",
		"Predict future traffic conditions accurately",
		"Reduce project risks and uncertainties",
		"Support evidence-based decision making",
		"Maximize return on infrastructure investments"
	];

	const process = [
		{ title: "Data Collection", description: "Comprehensive traffic data gathering and validation" },
		{ title: "Model Development", description: "Creation and calibration of detailed traffic models" },
		{ title: "Scenario Analysis", description: "Testing of multiple scenarios and improvement options" },
		{ title: "Recommendations", description: "Evidence-based recommendations and implementation guidance" }
	];

	const caseStudies = [
		{
			title: "Metropolitan Traffic Optimization",
			description: "City-wide traffic modeling leading to 25% reduction in congestion through optimized signal timing.",
			location: "Metropolitan Area",
			duration: "8 months",
			team: "12 specialists"
		},
		{
			title: "Highway Corridor Analysis",
			description: "Comprehensive modeling of 50-mile corridor evaluating managed lane and ITS strategies.",
			location: "Interstate Corridor",
			duration: "12 months",
			team: "8 specialists"
		},
		{
			title: "Special Event Planning",
			description: "Dynamic traffic modeling for major sporting events accommodating 75,000 visitors.",
			location: "Stadium District",
			duration: "4 months",
			team: "6 specialists"
		}
	];

	const stats = [
		{ value: "100+", label: "Models Developed" },
		{ value: "25%", label: "Average Delay Reduction" },
		{ value: "95%", label: "Prediction Accuracy" },
		{ value: "50+", label: "Cities Served" }
	];
</script>

<ServicePageLayout
	title="Traffic Modeling"
	subtitle="Sophisticated traffic modeling and simulation for optimal system performance"
	description="Advanced traffic modeling services using cutting-edge simulation technologies to predict traffic patterns, optimize operations, and support evidence-based transportation planning decisions."
	icon="📊"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>