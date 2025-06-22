<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Building2, BarChart3, Route, Shield, Clock, Target } from 'lucide-svelte';

	const features = [
		{
			icon: Building2,
			title: "Development Impact Analysis",
			description: "Comprehensive assessment of how new developments will affect existing traffic patterns and infrastructure."
		},
		{
			icon: BarChart3,
			title: "Trip Generation Studies",
			description: "Detailed analysis of trip generation, distribution, and assignment for proposed developments."
		},
		{
			icon: Route,
			title: "Network Impact Assessment",
			description: "Evaluation of impacts on the broader transportation network and regional connectivity."
		},
		{
			icon: Shield,
			title: "Mitigation Measures",
			description: "Development of effective mitigation strategies to address identified traffic impacts."
		},
		{
			icon: Clock,
			title: "Temporal Analysis",
			description: "Assessment of traffic impacts during different time periods and development phases."
		},
		{
			icon: Target,
			title: "Regulatory Compliance",
			description: "Ensuring compliance with local, regional, and national traffic impact assessment guidelines."
		}
	];

	const benefits = [
		"Support planning applications and approvals",
		"Identify potential traffic issues early",
		"Develop cost-effective mitigation measures",
		"Ensure sustainable development patterns",
		"Protect existing community interests",
		"Minimize environmental and social impacts"
	];

	const process = [
		{ title: "Baseline Assessment", description: "Analysis of existing traffic conditions and infrastructure capacity" },
		{ title: "Impact Prediction", description: "Forecasting of development-related traffic impacts" },
		{ title: "Mitigation Design", description: "Development of measures to address identified impacts" },
		{ title: "Monitoring Plan", description: "Creation of post-development monitoring and adjustment protocols" }
	];

	const caseStudies = [
		{
			title: "Mixed-Use Development TIA",
			description: "Comprehensive impact assessment for 2 million sq ft mixed-use development with integrated mitigation.",
			location: "Suburban Center",
			duration: "8 months",
			team: "10 specialists"
		},
		{
			title: "Retail Center Assessment",
			description: "Traffic impact study for major retail development including regional shopping center analysis.",
			location: "Commercial Corridor",
			duration: "6 months",
			team: "8 specialists"
		},
		{
			title: "Residential Community TIA",
			description: "Impact assessment for 1,500-unit residential development with phased construction analysis.",
			location: "Growth Area",
			duration: "10 months",
			team: "6 specialists"
		}
	];

	const stats = [
		{ value: "200+", label: "TIAs Completed" },
		{ value: "99%", label: "Approval Rate" },
		{ value: "85%", label: "Mitigation Success" },
		{ value: "5+", label: "Jurisdictions Served" }
	];
</script>

<ServicePageLayout
	title={$_('nav.traffic_impact_assessment')}
	subtitle="Professional traffic impact assessments for development projects"
	description="Expert traffic impact assessment services ensuring new developments integrate seamlessly with existing infrastructure while minimizing adverse effects on traffic operations."
	icon="🏢"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>