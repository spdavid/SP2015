<%@ Page Language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Taxonomy" Namespace="Microsoft.SharePoint.Taxonomy" Assembly="Microsoft.SharePoint.Taxonomy, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	<PublishingWebControls:EditModePanel runat="server">
		<!-- Styles for edit mode only-->
		<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %>"
			After="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	</PublishingWebControls:EditModePanel>
	<SharePointWebControls:FieldValue id="PageStylesField" FieldName="HeaderStyleDefinitions" runat="server"/>
</asp:Content>
<asp:Content contentplaceholderid="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:FieldValue id="PageTitle" FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content contentplaceholderid="PlaceHolderPageTitleInTitleArea" runat="server">
	<SharePointWebControls:FieldValue FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content contentplaceholderid="PlaceHolderTitleBreadcrumb" runat="server"> <SharePointWebControls:ListSiteMapPath runat="server" SiteMapProviders="CurrentNavigationSwitchableProvider" RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="s4-breadcrumb" NodeStyle-CssClass="s4-breadcrumbNode" CurrentNodeStyle-CssClass="s4-breadcrumbCurrentNode" RootNodeStyle-CssClass="s4-breadcrumbRootNode" NodeImageOffsetX=0 NodeImageOffsetY=289 NodeImageWidth=16 NodeImageHeight=16 NodeImageUrl="/_layouts/15/images/fgimg.png?rev=43" HideInteriorRootNodes="true" SkipLinkText="" /> </asp:Content>
<asp:Content contentplaceholderid="PlaceHolderMain" runat="server">
  
    
    <div><PublishingWebControls:RichImageField FieldName="PublishingPageImage" runat="server"></PublishingWebControls:RichImageField></div> 
   <PublishingWebControls:EditModePanel runat="server" PageDisplayMode="Display">
       <h1><SharePointWebControls:TextField FieldName="Title" runat="server"/></h1>
  </PublishingWebControls:EditModePanel>
        <PublishingWebControls:EditModePanel runat="server" PageDisplayMode="Edit">
       <SharePointWebControls:TextField FieldName="Title" runat="server"/>
  </PublishingWebControls:EditModePanel>
    <div><PublishingWebControls:RichHtmlField FieldName="PublishingPageContent" InputFieldLabel="Product Content" runat="server"></PublishingWebControls:RichHtmlField></div>
    <div><SharePointWebControls:DateTimeField FieldName="OD2_ReleaseDate"  runat="server"/> </div>
       <div><SharePointWebControls:UserField FieldName="OD2_Owner" runat="server"/> </div>
    <div><Taxonomy:TaxonomyFieldControl FieldName="TaxKeyword" InputFieldLabel="Tags" runat="server"></Taxonomy:TaxonomyFieldControl></div>
    <div><Taxonomy:TaxonomyFieldControl FieldName="OD2_ProdCat" runat="server"></Taxonomy:TaxonomyFieldControl></div>


</asp:Content>
