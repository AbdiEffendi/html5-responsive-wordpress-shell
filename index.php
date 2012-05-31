<?php get_header(); ?>

<div id="content" class="clear-fix" role="main">
	
	<?php if (have_posts()) : while (have_posts()) : the_post(); //BEGIN: The Loop ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

			<header>
				<h1><?php the_title(); ?></h1>
				<time datetime="<?php the_time('c'); ?>" pubdate="pubdate"><?php the_time('F jS, Y'); ?></time>
				<p>by <?php the_author() ?></p>
			</header>
			
			<div class="entry">
				<?php the_content(); ?>
			</div>
						
			<footer id="post-meta-data">
				<ul class="no-bullet">
					<li class="add-comment"><?php comments_popup_link('Share your comments', '1 Comment', '% Comments'); ?></li>
					<li>Posted in <?php the_category(', ') ?></li>
					<li><?php edit_post_link('[Edit]', '<small>', '</small>'); ?></li>
					<li><?php the_tags('Tags: ', ', ', '<br />'); ?></li>
				</ul>
			</footer>
		
		</article>
				
	<?php endwhile; ?>
		
		<?php wp_link_pages(); //this allows for multi-page posts -- not 100% sure this is the best spot for it ?>
		
	<?php else : ?>

		<h2>No posts were found :(</h2>

	<?php endif; ?>
	
	<?php if (  $wp_query->max_num_pages > 1 ) : // if there's more pages show next and previous links ?>
		
		<nav>
			<h1 class="hide">Main Navigation</h1>
			<?php posts_nav_link('&nbsp;','<div class="alignleft">&laquo; Previous Page</div>','<div class="alignright">Next Page &raquo;</div>') ?>
		</nav>
		
	<?php endif; ?>
	
</div>
<!--END: Content div-->

<!--BEGIN: Main Sidebar-->
<?php // to disable this sidebar on a page by page basis just add a custom field to your page or post of disableSidebarLeft = true
$disableSidebarMain = get_post_meta($post->ID, 'disableSidebarMain', $single = true);
if ($disableSidebarMain !== 'true'): ?>

<aside id="sidebar-main">
	<ul>
		<?php dynamic_sidebar('main-sidebar'); ?>
	</ul>
</aside>

<?php endif; ?>
<!--END: Main Sidebar-->

<?php get_footer(); ?>