<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { BarChart3, DollarSign, Clock, Target, Users, Zap } from 'lucide-svelte';

	const features = [
		{
			icon: BarChart3,
			title: "Market Analysis",
			description: "Comprehensive analysis of transportation demand, market conditions, and competitive landscape."
		},
		{
			icon: DollarSign,
			title: "Financial Modeling",
			description: "Detailed financial analysis including cost estimation, revenue projections, and ROI calculations."
		},
		{
			icon: Clock,
			title: "Implementation Planning",
			description: "Phased implementation strategies with realistic timelines and milestone definitions."
		},
		{
			icon: Target,
			title: "Risk Assessment",
			description: "Comprehensive risk analysis and mitigation strategies for project uncertainties."
		},
		{
			icon: Users,
			title: "Stakeholder Engagement",
			description: "Stakeholder consultation and community engagement to ensure project acceptance."
		},
		{
			icon: Zap,
			title: "Technology Assessment",
			description: "Evaluation of emerging technologies and their potential impact on project viability."
		}
	];

	const benefits = [
		"Validate project concepts before major investment",
		"Identify potential challenges early in development",
		"Support funding applications and approvals",
		"Minimize project risks and uncertainties",
		"Optimize project design and implementation",
		"Ensure stakeholder buy-in and support"
	];

	const process = [
		{ title: "Scope Definition", description: "Clear definition of study objectives, methodology, and deliverables" },
		{ title: "Data Collection", description: "Comprehensive data gathering and baseline analysis" },
		{ title: "Option Assessment", description: "Evaluation of alternative concepts and implementation strategies" },
		{ title: "Recommendations", description: "Evidence-based recommendations and next steps" }
	];

	const caseStudies = [
		{
			title: "Regional Rail Feasibility",
			description: "Comprehensive feasibility study for 75-mile regional rail system including ridership forecasting and financial analysis.",
			location: "Metropolitan Region",
			duration: "18 months",
			team: "15 specialists"
		},
		{
			title: "BRT System Feasibility",
			description: "Bus rapid transit feasibility study for urban corridor with detailed cost-benefit analysis.",
			location: "Urban Corridor",
			duration: "12 months",
			team: "10 specialists"
		},
		{
			title: "Port Access Feasibility",
			description: "Freight rail and highway access feasibility study for major port expansion project.",
			location: "Port Complex",
			duration: "15 months",
			team: "12 specialists"
		}
	];

	const stats = [
		{ value: "75+", label: "Studies Completed" },
		{ value: "85%", label: "Projects Advanced" },
		{ value: "$2B+", label: "Project Value Assessed" },
		{ value: "98%", label: "Accuracy Rate" }
	];
</script>

<ServicePageLayout
	title={$_('nav.transport_feasibility_studies')}
	subtitle="Comprehensive feasibility studies for transport project development"
	description="Expert feasibility studies providing thorough analysis of transport project viability, financial implications, and implementation strategies to support informed decision making."
	icon="📋"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>