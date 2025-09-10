<script>
	// @ts-ignore
	import SocialIcons from '@rodneylab/svelte-social-icons';

	let isDownloading = false;

	function downloadCV() {
		isDownloading = true;

		try {
			const cvUrl = '/docs/Andrei_Ioan_Balasoiu_CV.pdf';

			// 1. Abrir en nueva pestaña primero
			window.open(cvUrl, '_blank');

			// 2. Después iniciar la descarga
			setTimeout(() => {
				const link = document.createElement('a');
				link.href = cvUrl;
				link.download = 'Andrei_Ioan_Balasoiu_CV.pdf';

				// Añadir al DOM, hacer clic y remover
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}, 500); // Pequeño delay para que se abra primero
		} catch (error) {
			console.error('Error al descargar el CV:', error);
			// Fallback: solo abrir en nueva pestaña
			window.open('/docs/Andrei_Ioan_Balasoiu_CV.pdf', '_blank');
		} finally {
			// Resetear estado después de un breve delay
			setTimeout(() => {
				isDownloading = false;
			}, 1500);
		}
	}
</script>

<svelte:head>
	<title>Portfolio - En Construcción</title>
	<meta name="description" content="Portafolio personal - Sitio en construcción" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-800 text-gray-200">
	<div class="max-w-lg px-10 py-16 text-center">
		<!-- Avatar -->
		<div class="mx-auto mb-10 h-20 w-20">
			<img src="images/logo.png" alt="Avatar" class="h-full w-full rounded-full object-cover" />
		</div>

		<!-- Título -->
		<h1 class="mb-5 text-4xl font-light tracking-tight text-gray-50 md:text-5xl">
			Andrei Ioan Balasoiu
		</h1>

		<!-- Subtítulo -->
		<p class="mb-16 text-base font-light text-gray-400">
			👨‍💻 Técnico Superior en DAM | 💻 Técnico en SMR
		</p>

		<!-- Divider -->
		<div class="mx-auto mb-10 h-px w-16 bg-gray-600"></div>

		<!-- Mensaje de construcción -->
		<div class="mb-10 text-lg font-light leading-relaxed text-gray-300">
			Trabajando en algo nuevo.<br />
			Vuelve pronto.
		</div>

		<!-- Botón CV -->
		<button
			on:click={downloadCV}
			disabled={isDownloading}
			class="group relative my-8 inline-block overflow-hidden border border-gray-500 bg-transparent px-8 py-3 text-sm font-light uppercase tracking-widest text-gray-200 transition-all duration-300 hover:border-gray-50 hover:text-gray-800 disabled:opacity-50"
		>
			<span
				class="absolute inset-0 -translate-x-full transform bg-gray-50 transition-transform duration-300 ease-out group-hover:translate-x-0"
			></span>
			<span class="relative">
				{isDownloading ? 'Descargando...' : 'Descargar CV'}
			</span>
		</button>

		<!-- Enlaces sociales -->
		<div class="mt-12 flex items-center justify-center gap-8">
            <a href="mailto:devbyandrei@gmail.com" class="transition-transform hover:scale-110">
				<SocialIcons
					network="email"
					alt="Email"
					width="64"
					height="64"
					fgColor="#eeeeee"
					bgColor="transparent"
				/>
			</a>

            <a href="http://www.linkedin.com/in/devbyandrei" class="transition-transform hover:scale-110">
				<SocialIcons
					network="linkedin"
					alt="LinkedIn"
					width="64"
					height="64"
					fgColor="#eeeeee"
					bgColor="transparent"
				/>
			</a>

			<a href="https://github.com/DevByAndrei" class="transition-transform hover:scale-110">
				<SocialIcons
					network="github"
					alt="GitHub"
					width="64"
					height="64"
					fgColor="#eeeeee"
					bgColor="transparent"
				/>
			</a>
		</div>

		<!-- Status -->
		<div class="mt-16 text-xs font-light uppercase tracking-widest text-gray-500">
			En construcción
		</div>
	</div>
</div>

<style>
	h1 {
		font-family: Georgia, 'Times New Roman', Times, serif;
	}
</style>
