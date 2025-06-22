<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Route, AlertTriangle, Clock, Shield, Users, BarChart3, Cog, Target } from 'lucide-svelte';

	const features = [
		{
			icon: Route,
			title: "Comprehensive Route Planning",
			description: "Strategic planning of traffic routes to minimize disruption and maintain smooth flow during construction or events."
		},
		{
			icon: AlertTriangle,
			title: "Safety Protocol Development",
			description: "Detailed safety measures and protocols to protect workers, drivers, and pedestrians in work zones."
		},
		{
			icon: Clock,
			title: "Phased Implementation",
			description: "Carefully planned phases to minimize impact on daily traffic while ensuring project completion on schedule."
		},
		{
			icon: Shield,
			title: "Emergency Response Plans",
			description: "Comprehensive emergency procedures and rapid response protocols for unexpected situations."
		},
		{
			icon: BarChart3,
			title: "Real-time Monitoring",
			description: "Advanced monitoring systems to track traffic conditions and adjust plans dynamically as needed."
		},
		{
			icon: Users,
			title: "Stakeholder Coordination",
			description: "Effective communication and coordination with authorities, contractors, and the public."
		}
	];

	const benefits = [
		"Minimize traffic disruption and delays",
		"Ensure safety for all road users and workers",
		"Maintain emergency vehicle access",
		"Reduce project completion time",
		"Improve public satisfaction and compliance",
		"Lower liability and insurance costs"
	];

	const process = [
		{ title: "Traffic Analysis", description: "Comprehensive study of existing traffic patterns and volumes" },
		{ title: "Plan Development", description: "Creation of detailed traffic management strategy" },
		{ title: "Approval & Coordination", description: "Obtaining necessary permits and stakeholder coordination" },
		{ title: "Implementation & Monitoring", description: "Execution of plan with continuous monitoring and adjustment" }
	];

	const caseStudies = [
		{
			title: "Highway Bridge Reconstruction",
			description: "Complex traffic management for a major bridge replacement project maintaining 85% normal traffic flow.",
			location: "Interstate Corridor",
			duration: "18 months",
			team: "12 specialists"
		},
		{
			title: "Urban Street Renovation",
			description: "Downtown street reconstruction with coordinated traffic management preserving business access.",
			location: "Downtown District",
			duration: "6 months",
			team: "8 specialists"
		},
		{
			title: "Festival Traffic Management",
			description: "Large-scale event traffic planning for annual festival accommodating 100,000+ visitors.",
			location: "City Center",
			duration: "3 months planning",
			team: "15 specialists"
		}
	];

	const stats = [
		{ value: "200+", label: "Projects Managed" },
		{ value: "90%", label: "Traffic Flow Maintained" },
		{ value: "Zero", label: "Major Incidents" },
		{ value: "24/7", label: "Monitoring Support" }
	];
</script>

<ServicePageLayout
	title="Traffic Management Plans"
	subtitle="Strategic traffic management planning for safe and efficient operations"
	description="Expert traffic management planning services ensuring minimal disruption, maximum safety, and smooth traffic flow during construction, events, and emergency situations."
	icon="🚦"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>