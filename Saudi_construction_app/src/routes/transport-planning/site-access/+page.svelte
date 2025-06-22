<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Route, Target, Shield, BarChart3, Users, Settings } from 'lucide-svelte';

	const features = [
		{
			icon: Route,
			title: "Optimal Access Design",
			description: "Strategic design of site access points to ensure safe and efficient connectivity to existing road networks."
		},
		{
			icon: Target,
			title: "Sight Distance Analysis",
			description: "Comprehensive sight distance studies ensuring safe turning movements and adequate visibility."
		},
		{
			icon: Shield,
			title: "Safety Assessment",
			description: "Detailed safety analysis of proposed access points including conflict point evaluation."
		},
		{
			icon: BarChart3,
			title: "Capacity Analysis",
			description: "Traffic capacity analysis to ensure access points can handle projected traffic volumes."
		},
		{
			icon: Users,
			title: "Multi-Modal Integration",
			description: "Integration of pedestrian, cyclist, and public transport access requirements."
		},
		{
			icon: Settings,
			title: "Regulatory Compliance",
			description: "Ensuring compliance with local access management policies and design standards."
		}
	];

	const benefits = [
		"Ensure safe and efficient site connectivity",
		"Minimize impact on existing traffic operations",
		"Comply with regulatory requirements",
		"Optimize development potential",
		"Reduce long-term operational issues",
		"Support sustainable transport modes"
	];

	const process = [
		{ title: "Site Evaluation", description: "Comprehensive assessment of site conditions and constraints" },
		{ title: "Access Strategy", description: "Development of optimal access strategy and layout design" },
		{ title: "Impact Assessment", description: "Analysis of impacts on existing road network operations" },
		{ title: "Design Finalization", description: "Detailed design development and approval documentation" }
	];

	const caseStudies = [
		{
			title: "Commercial Development Access",
			description: "Multi-point access design for large commercial development with coordinated signal timing.",
			location: "Major Arterial",
			duration: "6 months",
			team: "6 specialists"
		},
		{
			title: "Industrial Facility Access",
			description: "Heavy vehicle access design for manufacturing facility with dedicated turning lanes.",
			location: "Industrial Zone",
			duration: "4 months",
			team: "4 specialists"
		},
		{
			title: "Residential Community Access",
			description: "Safe access design for 800-unit residential community with emergency vehicle considerations.",
			location: "Suburban Area",
			duration: "5 months",
			team: "5 specialists"
		}
	];

	const stats = [
		{ value: "300+", label: "Access Designs" },
		{ value: "99%", label: "Approval Success" },
		{ value: "Zero", label: "Safety Issues" },
		{ value: "95%", label: "Client Satisfaction" }
	];
</script>

<ServicePageLayout
	title={$_('nav.site_access')}
	subtitle="Optimal site access design for safe and efficient connectivity"
	description="Professional site access design services ensuring safe, efficient, and compliant connections between developments and existing transportation networks."
	icon="🛤️"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>