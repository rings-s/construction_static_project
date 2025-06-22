<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Leaf, Zap, Droplets, Wind, Sun, Recycle } from 'lucide-svelte';

	const features = [
		{
			icon: Leaf,
			title: "Green Infrastructure",
			description: "Integration of sustainable materials, green corridors, and environmentally friendly construction practices."
		},
		{
			icon: Zap,
			title: "Electric Vehicle Infrastructure",
			description: "Comprehensive EV charging networks and infrastructure to support the transition to electric mobility."
		},
		{
			icon: Droplets,
			title: "Stormwater Management",
			description: "Innovative stormwater management systems including permeable pavements and bioretention features."
		},
		{
			icon: Wind,
			title: "Carbon Footprint Reduction",
			description: "Strategies and solutions to minimize greenhouse gas emissions and environmental impact."
		},
		{
			icon: Sun,
			title: "Renewable Energy Integration",
			description: "Solar-powered infrastructure and energy-efficient lighting systems for sustainable operations."
		},
		{
			icon: Recycle,
			title: "Circular Economy Principles",
			description: "Material reuse and recycling strategies to minimize waste and promote sustainability."
		}
	];

	const benefits = [
		"Reduce environmental impact and carbon emissions",
		"Lower long-term operational and maintenance costs",
		"Improve air quality and community health",
		"Support climate resilience and adaptation",
		"Enhance project sustainability ratings",
		"Future-proof infrastructure investments"
	];

	const process = [
		{ title: "Sustainability Assessment", description: "Comprehensive environmental impact analysis and baseline assessment" },
		{ title: "Green Design Development", description: "Integration of sustainable features and technologies into design" },
		{ title: "Life Cycle Analysis", description: "Evaluation of long-term environmental and economic impacts" },
		{ title: "Implementation & Monitoring", description: "Sustainable construction practices and performance monitoring" }
	];

	const caseStudies = [
		{
			title: "Eco-Highway Corridor",
			description: "20-mile sustainable highway featuring solar lighting, EV charging, and wildlife crossings.",
			location: "Rural-Urban Connector",
			duration: "30 months",
			team: "25 specialists"
		},
		{
			title: "Green Transit Hub",
			description: "Multi-modal transit center with green roof, rainwater harvesting, and zero-emission design.",
			location: "Metropolitan Area",
			duration: "18 months",
			team: "15 specialists"
		},
		{
			title: "Sustainable BRT System",
			description: "Bus rapid transit system with electric buses, solar power, and green infrastructure elements.",
			location: "Urban Corridor",
			duration: "24 months",
			team: "20 specialists"
		}
	];

	const stats = [
		{ value: "60%", label: "CO2 Reduction Achieved" },
		{ value: "100+", label: "MW Renewable Energy" },
		{ value: "85%", label: "Material Recycling Rate" },
		{ value: "50+", label: "LEED Projects" }
	];
</script>

<ServicePageLayout
	title="Sustainable Transport"
	subtitle="Eco-friendly transport solutions for a greener future"
	description="Innovative sustainable transport solutions that reduce environmental impact while enhancing efficiency and accessibility through green technologies and sustainable design practices."
	icon="🌱"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>