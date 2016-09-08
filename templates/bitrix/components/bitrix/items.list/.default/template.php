<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

$this->setFrameMode(true);
?>
<? $pic = CFile::GetPath($arResult["PICTURE"]); ?>

<?=$arResult["NAME"]?>

<?=$arResult["DESCRIPTION"]?>

<?foreach($arResult["ITEMS"] as $arItem):?>
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
   ?>
    <?=$arItem["NAME"]?>

    <img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="" />

    <?=$arItem["PREVIEW_TEXT"]?>

    <?=$arItem["PROPERTIES"]["PERIOD"]["VALUE"]?>

<?endforeach;?>


