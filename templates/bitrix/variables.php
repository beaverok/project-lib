// вывод метатегов
<?$ShowMetaKeywords = $APPLICATION->ShowMeta("keywords");?>
<?$ShowMetaDescr = $APPLICATION->ShowMeta("description");?>

// вывод заголовка страницы
<?$ShowTitle = $APPLICATION->ShowTitle();?>

//вывод служебных стилей
<?$ShowCSS = $APPLICATION->ShowCSS();?>
<?$ShowHeadStrings = $APPLICATION->ShowHeadStrings();?>

// вывод панели
<?$APPLICATION->ShowPanel();?>

// вывод системных скриптов
<?$APPLICATION->ShowHeadScripts();?>

// константы
<?=SITE_DIR?>  // директория сайта
<?=SITE_TEMPLATE_PATH?> //папка с шаблоном сайта

// текущая страница
<? $page = $APPLICATION->GetCurPage(); ?>
