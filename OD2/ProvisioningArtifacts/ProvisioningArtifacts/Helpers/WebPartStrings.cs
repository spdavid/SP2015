using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProvisioningArtifacts.Helpers
{
    class WebPartStrings
    {
        public const string ProductSearchWP = @"<webParts>
  <webPart xmlns='http://schemas.microsoft.com/WebPart/v3'>
    <metaData>
      <type name='Microsoft.Office.Server.Search.WebControls.ResultScriptWebPart, Microsoft.Office.Server.Search, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c' />
      <importErrorMessage>Cannot import this Web Part.</importErrorMessage>
    </metaData>
    <data>
      <properties>
        <property name='MaxPagesBeforeCurrent' type='int'>4</property>
        <property name='ShowViewDuplicates' type='bool'>False</property>
        <property name='AdvancedSearchPageAddress' type='string'>advanced.aspx</property>
        <property name='DataProviderJSON' type='string'>{'QueryGroupName':'74c67df3-012c-412f-80cf-ca91c52e59c2','QueryPropertiesTemplateUrl':'sitesearch://webroot','IgnoreQueryPropertiesTemplateUrl':false,'SourceID':'8413cd39-2156-4e00-b54d-11efd9abdb89','SourceName':'Local SharePoint Results','SourceLevel':'Ssa','CollapseSpecification':'','QueryTemplate':'ContentType:Product','FallbackSort':[{'p':'RefinableDate00','d':1}],'FallbackSortJson':'[{\'p\':\'RefinableDate00\',\'d\':1}]','RankRules':null,'RankRulesJson':'null','AsynchronousResultRetrieval':false,'SendContentBeforeQuery':true,'BatchClientQuery':true,'FallbackLanguage':-1,'FallbackRankingModelID':'','EnableStemming':true,'EnablePhonetic':false,'EnableNicknames':false,'EnableInterleaving':true,'EnableQueryRules':true,'EnableOrderingHitHighlightedProperty':false,'HitHighlightedMultivaluePropertyLimit':-1,'IgnoreContextualScope':false,'ScopeResultsToCurrentSite':false,'TrimDuplicates':false,'Properties':{'ListId':'8b6b6d42-a680-4ae4-87ca-6dfd1c64c3eb','ListItemId':3},'PropertiesJson':'{\'ListId\':\'8b6b6d42-a680-4ae4-87ca-6dfd1c64c3eb\',\'ListItemId\':3}','ClientType':'','UpdateAjaxNavigate':true,'SummaryLength':180,'DesiredSnippetLength':90,'PersonalizedQuery':false,'FallbackRefinementFilters':null,'IgnoreStaleServerQuery':false,'RenderTemplateId':'DefaultDataProvider','AlternateErrorMessage':null,'Title':'','ClientFunction':'','ClientFunctionDetails':''}</property>
 <property name='SelectedPropertiesJson' type='string'>['RefinableDate00','Title','owstaxIdOD2ProdCat','PublishingImage','Path','Description','EditorOWSUSER','LastModifiedTime','CollapsingStatus','DocId','HitHighlightedSummary','HitHighlightedProperties','FileExtension','ViewsLifeTime','ParentLink','FileType','IsContainer','SecondaryFileExtension','DisplayAuthor']</property>       
        <property name='RepositionLanguageDropDown' type='bool'>False</property>
        <property name='PreloadedItemTemplateIdsJson' type='string'>['~sitecollection/_catalogs/masterpage/Display Templates/Search/Group_Default.js','~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Default.js','~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Site.js','~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Word.js','~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_PowerPoint.js','~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Person_CompactHorizontal.js','~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_BestBet.js','~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_WebPage.js']</property>
        <property name='ResultsPerPage' type='int'>10</property>
        <property name='EmitStyleReference' type='bool'>True</property>
        <property name='ShowPaging' type='bool'>False</property>
        <property name='ResultTypeId' type='string' null='true' />
        <property name='ShowUpScopeMessage' type='bool'>False</property>
      
        <property name='Title' type='string'>Latest Products</property>
        <property name='ShowResults' type='bool'>True</property>
        <property name='MaxPagesAfterCurrent' type='int'>1</property>
        <property name='ShowResultCount' type='bool'>False</property>
        <property name='ItemTemplateId' type='string'>~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Product.js</property>
        <property name='ItemBodyTemplateId' type='string'>~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_CommonItem_Body.js</property>
        <property name='UseSimplifiedQueryBuilder' type='bool'>False</property>
        <property name='HitHighlightedPropertiesJson' type='string'>['Title','Path','Author','SectionNames','SiteDescription']</property>
        <property name='AvailableSortsJson' type='string'>[{'name':'Relevance','sorts':[]},{'name':'Date(Newest)','sorts':[{'p':'Write','d':1}]},{'name':'Date(Oldest)','sorts':[{'p':'Write','d':0}]},{'name':'Lifetime Views','sorts':[{'p':'ViewsLifeTime','d':1}]},{'name':'Recent Views','sorts':[{'p':'ViewsRecent','d':1}]}]</property>
        <property name='ChromeState' type='chromestate'>Normal</property>
        <property name='RenderTemplateId' type='string'>~sitecollection/_catalogs/masterpage/Display Templates/Search/Control_SearchResults.js</property>
        <property name='ShowPersonalFavorites' type='bool'>False</property>
        <property name='ShowSortOptions' type='bool'>False</property>
        <property name='ChromeType' type='chrometype'>None</property>
        <property name='AllowConnect' type='bool'>True</property>
        <property name='ShowLanguageOptions' type='bool'>False</property>
        <property name='Description' type='string'>Displays the search results and the properties associated with them.</property>
        <property name='ServerIncludeScriptsJson' type='string'>null</property>
        <property name='TitleUrl' type='string' />
        <property name='AlternateErrorMessage' type='string' null='true' />
        <property name='ShowAlertMe' type='bool'>False</property>
        <property name='ShowDidYouMean' type='bool'>False</property>
        <property name='QueryGroupName' type='string'>74c67df3-012c-412f-80cf-ca91c52e59c2</property>
        <property name='BypassResultTypes' type='bool'>True</property>
      </properties>
    </data>
  </webPart>
</webParts>";

        public const string ContentEditorWp = @"<?xml version='1.0' encoding='utf-8'?>
<WebPart xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns='http://schemas.microsoft.com/WebPart/v2'>
  <Title>Content Editor</Title>
  
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter />
  <Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>
  <TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>
  <ContentLink xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />
  <Content xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor'><![CDATA[​dsasdfas​df asdf asdf asdfa sdf<br/>]]></Content>
  <PartStorage xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />
</WebPart>";
    }
}
