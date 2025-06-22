<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Zap, Wifi, Camera, BarChart3, Shield, Cpu } from 'lucide-svelte';

	const features = [
		{
			icon: Zap,
			title: "Adaptive Signal Control",
			description: "Advanced traffic signal systems that adapt in real-time to changing traffic conditions and demands."
		},
		{
			icon: Wifi,
			title: "Connected Infrastructure",
			description: "IoT-enabled infrastructure providing real-time data collection and remote monitoring capabilities."
		},
		{
			icon: Camera,
			title: "Intelligent Surveillance",
			description: "AI-powered video analytics for incident detection, traffic monitoring, and automated enforcement."
		},
		{
			icon: BarChart3,
			title: "Data Analytics Platform",
			description: "Comprehensive data analytics and visualization platforms for informed decision making."
		},
		{
			icon: Shield,
			title: "Incident Management",
			description: "Automated incident detection and response systems to minimize traffic disruption."
		},
		{
			icon: Cpu,
			title: "AI-Powered Optimization",
			description: "Machine learning algorithms for predictive traffic management and system optimization."
		}
	];

	const benefits = [
		"Reduce traffic congestion and delays",
		"Improve safety through automated monitoring",
		"Enhance system efficiency and capacity",
		"Provide real-time traveler information",
		"Enable proactive traffic management",
		"Support data-driven decision making"
	];

	const process = [
		{ title: "System Design", description: "Comprehensive ITS architecture and component specification" },
		{ title: "Technology Integration", description: "Integration of hardware, software, and communication systems" },
		{ title: "Testing & Commissioning", description: "Thorough testing and system commissioning procedures" },
		{ title: "Operations Support", description: "Ongoing operational support and system optimization" }
	];

	const caseStudies = [
		{
			title: "Smart City Traffic Management",
			description: "City-wide ITS deployment covering 200+ intersections with adaptive signal control and incident management.",
			location: "Smart City Initiative",
			duration: "24 months",
			team: "20 specialists"
		},
		{
			title: "Highway ITS Corridor",
			description: "Comprehensive ITS implementation on 50-mile highway corridor with CCTV, DMS, and incident detection.",
			location: "Interstate Highway",
			duration: "18 months",
			team: "15 specialists"
		},
		{
			title: "Transit Priority System",
			description: "Bus rapid transit priority system with signal preemption and passenger information systems.",
			location: "BRT Corridor",
			duration: "12 months",
			team: "10 specialists"
		}
	];

	const stats = [
		{ value: "50+", label: "ITS Projects" },
		{ value: "30%", label: "Delay Reduction" },
		{ value: "99.9%", label: "System Uptime" },
		{ value: "1000+", label: "Devices Managed" }
	];
</script>

<ServicePageLayout
	title={$_('nav.its')}
	subtitle="Intelligent Transport Systems for smart mobility solutions"
	description="Cutting-edge ITS solutions leveraging advanced technologies to optimize traffic operations, enhance safety, and provide real-time information to travelers and system operators."
	icon="🤖"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>