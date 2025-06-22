<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Shuffle, Target, BarChart3, Shield, Zap, Cog } from 'lucide-svelte';

	const features = [
		{
			icon: Shuffle,
			title: "Advanced Geometric Design",
			description: "Sophisticated junction layouts optimized for capacity, safety, and operational efficiency using latest design standards."
		},
		{
			icon: Target,
			title: "Capacity Optimization",
			description: "Detailed capacity analysis and design to handle current and projected traffic volumes effectively."
		},
		{
			icon: Shield,
			title: "Safety Engineering",
			description: "Comprehensive safety analysis and implementation of proven safety measures to reduce accident risk."
		},
		{
			icon: BarChart3,
			title: "Traffic Flow Modeling",
			description: "Advanced microsimulation modeling to predict and optimize traffic flow patterns and performance."
		},
		{
			icon: Zap,
			title: "Smart Signal Integration",
			description: "Integration of intelligent traffic signal systems and adaptive control technologies."
		},
		{
			icon: Cog,
			title: "Multi-Modal Considerations",
			description: "Design considerations for pedestrians, cyclists, public transport, and freight vehicles."
		}
	];

	const benefits = [
		"Reduce traffic congestion and delays",
		"Improve road safety for all users",
		"Accommodate future traffic growth",
		"Minimize environmental impact",
		"Enhance connectivity and accessibility",
		"Optimize maintenance and operational costs"
	];

	const process = [
		{ title: "Traffic Assessment", description: "Comprehensive analysis of existing and projected traffic conditions" },
		{ title: "Conceptual Design", description: "Development of junction layout options and preliminary design" },
		{ title: "Detailed Engineering", description: "Complete engineering design with all technical specifications" },
		{ title: "Construction Support", description: "Construction oversight and commissioning support" }
	];

	const caseStudies = [
		{
			title: "Major Interstate Interchange",
			description: "Complete redesign of a complex four-level interchange improving capacity by 40% and reducing accidents by 60%.",
			location: "Metropolitan Highway",
			duration: "24 months",
			team: "20 specialists"
		},
		{
			title: "Urban Roundabout System",
			description: "Conversion of signalized intersection to modern roundabout reducing delays by 50% and improving safety.",
			location: "City Arterial",
			duration: "8 months",
			team: "6 specialists"
		},
		{
			title: "Smart Junction Upgrade",
			description: "Installation of adaptive signal control and ITS infrastructure at critical urban junction.",
			location: "Business District",
			duration: "4 months",
			team: "8 specialists"
		}
	];

	const stats = [
		{ value: "75+", label: "Junctions Designed" },
		{ value: "45%", label: "Average Capacity Increase" },
		{ value: "55%", label: "Safety Improvement" },
		{ value: "30%", label: "Delay Reduction" }
	];
</script>

<ServicePageLayout
	title="Highway & Junction Design"
	subtitle="Advanced highway and junction design for optimal traffic flow and safety"
	description="Expert highway and junction design services incorporating the latest standards, technologies, and best practices to create efficient, safe, and future-ready infrastructure."
	icon="🛣️"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>