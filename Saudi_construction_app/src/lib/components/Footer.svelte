<!-- src/lib/components/Footer.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-svelte';

	const quickLinks = [
		{ name: 'nav.home', href: '/' },
		{ name: 'nav.about', href: '/about' },
		{ name: 'nav.services', href: '/services' },
		{ name: 'nav.blog', href: '/blog' },
		{ name: 'nav.contact', href: '/contact' }
	];

	const serviceLinks = [
		{ name: 'nav.highway_engineering', href: '/highway-engineering' },
		{ name: 'nav.traffic_engineering', href: '/traffic-engineering' },
		{ name: 'nav.transport_planning', href: '/transport-planning' },
		{ name: 'nav.industry_assessment', href: '/services/industry-assessment' },
		{ name: 'nav.public_consultation', href: '/services/public-consultation' }
	];

	const socialLinks = [
		{ icon: Facebook, href: '#', label: 'Facebook' },
		{ icon: Twitter, href: '#', label: 'Twitter' },
		{ icon: Linkedin, href: '#', label: 'LinkedIn' },
		{ icon: Instagram, href: '#', label: 'Instagram' }
	];
</script>

<footer class="bg-slate-900 text-white">
	<!-- Main Footer -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<!-- Company Info -->
			<div class="lg:col-span-1">
				<div class="flex items-center mb-6">
					<div class="w-10 h-10 bg-gradient-to-br from-primary-600 to-emerald-600 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-xl">TC</span>
					</div>
					<div class="ml-3 rtl:mr-3 rtl:ml-0">
						<div class="text-xl font-bold font-display">Transport Consulting</div>
						<div class="text-xs text-slate-400 -mt-1">Engineering Excellence</div>
					</div>
				</div>
				<p class="text-slate-300 mb-6 leading-relaxed">
					{$_('footer.company_description')}
				</p>
				<div class="flex space-x-4 rtl:space-x-reverse">
					{#each socialLinks as social}
						<a 
							href={social.href} 
							class="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
							aria-label={social.label}
						>
							<svelte:component this={social.icon} class="w-5 h-5" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="text-lg font-semibold mb-6">{$_('footer.quick_links')}</h3>
				<ul class="space-y-3">
					{#each quickLinks as link}
						<li>
							<a 
								href={link.href} 
								class="text-slate-300 hover:text-white transition-colors hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
							>
								{$_(link.name)}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Services -->
			<div>
				<h3 class="text-lg font-semibold mb-6">{$_('footer.services_links')}</h3>
				<ul class="space-y-3">
					{#each serviceLinks as link}
						<li>
							<a 
								href={link.href} 
								class="text-slate-300 hover:text-white transition-colors hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
							>
								{$_(link.name)}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Info -->
			<div>
				<h3 class="text-lg font-semibold mb-6">{$_('footer.contact_info')}</h3>
				<div class="space-y-4">
					<div class="flex items-start">
						<MapPin class="w-5 h-5 text-primary-400 mr-3 rtl:ml-3 rtl:mr-0 mt-1 flex-shrink-0" />
						<div class="text-slate-300">
							<div>{$_('contact.info.address')}</div>
						</div>
					</div>
					<div class="flex items-center">
						<Phone class="w-5 h-5 text-primary-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
						<a href="tel:+15551234567" class="text-slate-300 hover:text-white transition-colors">
							{$_('contact.info.phone')}
						</a>
					</div>
					<div class="flex items-center">
						<Mail class="w-5 h-5 text-primary-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
						<a href="mailto:info@transportconsulting.com" class="text-slate-300 hover:text-white transition-colors">
							{$_('contact.info.email')}
						</a>
					</div>
					<div class="flex items-center">
						<Clock class="w-5 h-5 text-primary-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
						<div class="text-slate-300">
							{$_('contact.info.hours')}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div class="border-t border-slate-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="text-slate-400 text-sm">
					© 2025 Transport Consulting. {$_('footer.rights_reserved')}
				</div>
				<div class="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
					<a href="/privacy" class="text-slate-400 hover:text-white text-sm transition-colors">
						{$_('footer.privacy_policy')}
					</a>
					<a href="/terms" class="text-slate-400 hover:text-white text-sm transition-colors">
						{$_('footer.terms_of_service')}
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>