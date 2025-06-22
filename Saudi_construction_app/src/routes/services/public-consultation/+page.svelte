<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Users, MessageSquare, Target, BarChart3, Globe, Shield } from 'lucide-svelte';

	const features = [
		{
			icon: Users,
			title: "Stakeholder Engagement",
			description: "Comprehensive stakeholder identification and engagement strategies for inclusive participation."
		},
		{
			icon: MessageSquare,
			title: "Multi-Channel Communication",
			description: "Diverse communication channels including digital platforms, community meetings, and targeted outreach."
		},
		{
			icon: Target,
			title: "Facilitation Services",
			description: "Professional facilitation of public meetings, workshops, and collaborative planning sessions."
		},
		{
			icon: BarChart3,
			title: "Feedback Analysis",
			description: "Systematic analysis and integration of public feedback into project planning and design processes."
		},
		{
			icon: Globe,
			title: "Multilingual Support",
			description: "Multilingual consultation services ensuring inclusive participation across diverse communities."
		},
		{
			icon: Shield,
			title: "Conflict Resolution",
			description: "Professional mediation and conflict resolution services for challenging stakeholder situations."
		}
	];

	const benefits = [
		"Build community support for projects",
		"Identify issues and concerns early",
		"Improve project design through feedback",
		"Ensure regulatory compliance",
		"Reduce project delivery risks",
		"Enhance long-term project success"
	];

	const process = [
		{ title: "Strategy Development", description: "Development of comprehensive consultation strategy and engagement plan" },
		{ title: "Stakeholder Outreach", description: "Implementation of multi-channel stakeholder engagement activities" },
		{ title: "Feedback Integration", description: "Analysis and integration of feedback into project development" },
		{ title: "Ongoing Engagement", description: "Continued engagement throughout project lifecycle" }
	];

	const caseStudies = [
		{
			title: "Highway Expansion Consultation",
			description: "Comprehensive public consultation for major highway expansion affecting 15 communities with multilingual support.",
			location: "Regional Highway",
			duration: "12 months",
			team: "8 specialists"
		},
		{
			title: "Transit System Planning",
			description: "Community engagement for new transit system including 25 public meetings and online consultation platform.",
			location: "Urban Area",
			duration: "10 months",
			team: "6 specialists"
		},
		{
			title: "Active Transportation Plan",
			description: "Public consultation for city-wide cycling and walking infrastructure plan with youth engagement focus.",
			location: "Municipal Area",
			duration: "8 months",
			team: "5 specialists"
		}
	];

	const stats = [
		{ value: "100+", label: "Consultations Completed" },
		{ value: "10,000+", label: "Participants Engaged" },
		{ value: "15+", label: "Languages Supported" },
		{ value: "95%", label: "Positive Outcomes" }
	];
</script>

<ServicePageLayout
	title={$_('nav.public_consultation')}
	subtitle="Professional public consultation and community engagement services"
	description="Expert public consultation services ensuring meaningful community engagement, stakeholder participation, and collaborative planning for transport infrastructure projects."
	icon="🤝"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>