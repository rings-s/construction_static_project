<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { BarChart3, TrendingUp, Target, Users, Zap, Building2 } from 'lucide-svelte';

	const features = [
		{
			icon: BarChart3,
			title: "Market Analysis",
			description: "Comprehensive analysis of transport industry trends, market dynamics, and competitive landscape."
		},
		{
			icon: TrendingUp,
			title: "Performance Benchmarking",
			description: "Detailed benchmarking against industry standards and best practices for performance optimization."
		},
		{
			icon: Target,
			title: "Strategic Planning Support",
			description: "Evidence-based insights to support strategic planning and business development decisions."
		},
		{
			icon: Users,
			title: "Stakeholder Mapping",
			description: "Comprehensive stakeholder analysis and engagement strategy development."
		},
		{
			icon: Zap,
			title: "Technology Assessment",
			description: "Evaluation of emerging technologies and their potential impact on industry operations."
		},
		{
			icon: Building2,
			title: "Regulatory Analysis",
			description: "Assessment of regulatory environment and compliance requirements across jurisdictions."
		}
	];

	const benefits = [
		"Understand market position and opportunities",
		"Identify industry trends and disruptions",
		"Benchmark performance against peers",
		"Support strategic decision making",
		"Minimize investment risks",
		"Optimize operational efficiency"
	];

	const process = [
		{ title: "Industry Mapping", description: "Comprehensive mapping of industry landscape and key players" },
		{ title: "Data Analysis", description: "Detailed analysis of market data, trends, and performance metrics" },
		{ title: "Gap Assessment", description: "Identification of gaps, opportunities, and potential challenges" },
		{ title: "Strategic Recommendations", description: "Development of actionable strategies and recommendations" }
	];

	const caseStudies = [
		{
			title: "Regional Transit Authority Assessment",
			description: "Comprehensive industry assessment for regional transit authority including service optimization recommendations.",
			location: "Metropolitan Region",
			duration: "8 months",
			team: "10 specialists"
		},
		{
			title: "Freight Industry Analysis",
			description: "Market analysis of regional freight industry including technology adoption and efficiency opportunities.",
			location: "Industrial Corridor",
			duration: "6 months",
			team: "8 specialists"
		},
		{
			title: "Smart Mobility Ecosystem",
			description: "Assessment of emerging smart mobility ecosystem and integration opportunities for public agencies.",
			location: "Smart City Initiative",
			duration: "10 months",
			team: "12 specialists"
		}
	];

	const stats = [
		{ value: "50+", label: "Assessments Completed" },
		{ value: "95%", label: "Client Satisfaction" },
		{ value: "25+", label: "Industries Analyzed" },
		{ value: "100%", label: "Actionable Insights" }
	];
</script>

<ServicePageLayout
	title={$_('nav.industry_assessment')}
	subtitle="Strategic industry analysis and assessment services"
	description="Professional industry assessment services providing comprehensive analysis of transport markets, trends, and opportunities to support strategic planning and business development."
	icon="🏭"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>