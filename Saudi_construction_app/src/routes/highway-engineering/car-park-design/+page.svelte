<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Settings, Zap, Shield, Leaf, Target, Users, BarChart3, Cog } from 'lucide-svelte';

	const features = [
		{
			icon: Settings,
			title: "Optimal Space Utilization",
			description: "Advanced layout design maximizing parking capacity while ensuring smooth traffic flow and accessibility compliance."
		},
		{
			icon: Zap,
			title: "Smart Parking Solutions",
			description: "Integration of modern technologies including EV charging stations, smart payment systems, and real-time availability monitoring."
		},
		{
			icon: Shield,
			title: "Safety & Security",
			description: "Comprehensive safety measures including proper lighting, surveillance systems, and emergency access routes."
		},
		{
			icon: Leaf,
			title: "Sustainable Design",
			description: "Environmentally conscious solutions incorporating green infrastructure, stormwater management, and energy-efficient lighting."
		},
		{
			icon: Target,
			title: "Accessibility Compliance",
			description: "Full compliance with ADA requirements and local accessibility standards for inclusive design."
		},
		{
			icon: BarChart3,
			title: "Traffic Flow Analysis",
			description: "Detailed traffic flow studies to optimize entry, exit, and internal circulation patterns."
		}
	];

	const benefits = [
		"Maximize parking capacity within space constraints",
		"Reduce construction and operational costs",
		"Improve user experience and satisfaction",
		"Ensure regulatory compliance and safety standards",
		"Future-proof design for emerging technologies",
		"Minimize environmental impact through sustainable practices"
	];

	const process = [
		{ title: "Site Assessment", description: "Comprehensive analysis of site conditions, constraints, and opportunities" },
		{ title: "Demand Analysis", description: "Detailed parking demand study and capacity planning" },
		{ title: "Design Development", description: "Creation of optimal layout and infrastructure design" },
		{ title: "Implementation", description: "Construction oversight and quality assurance" }
	];

	const caseStudies = [
		{
			title: "Downtown Commercial Complex",
			description: "Multi-level parking facility serving a major shopping center with 800 spaces and integrated retail.",
			location: "City Center",
			duration: "12 months",
			team: "8 specialists"
		},
		{
			title: "Hospital Parking Expansion",
			description: "Expansion project adding 500 spaces with specialized access for emergency vehicles and patients.",
			location: "Medical District",
			duration: "8 months", 
			team: "6 specialists"
		},
		{
			title: "University Campus Parking",
			description: "Sustainable parking solution for 1,200 vehicles with electric vehicle charging infrastructure.",
			location: "University Campus",
			duration: "10 months",
			team: "10 specialists"
		}
	];

	const stats = [
		{ value: "150+", label: "Car Parks Designed" },
		{ value: "50,000+", label: "Parking Spaces Created" },
		{ value: "98%", label: "Client Satisfaction" },
		{ value: "15+", label: "Years Experience" }
	];
</script>

<ServicePageLayout
	title="Car Park Design"
	subtitle="Efficient and sustainable car park solutions with optimal space utilization"
	description="Professional car park design services that maximize capacity, enhance user experience, and ensure safety while incorporating sustainable and smart technology solutions."
	icon="🚗"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>