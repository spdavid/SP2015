using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.SharePoint.Client.Taxonomy;

namespace ProductPageWeb.Helpers
{
    public class ContentHelper
    {

        public static void CreateProductContentType(ClientContext ctx)
        {
            Web root = ctx.Site.RootWeb;

            // inherits from welcomepage. We add a 00 then our new quid without spaces to construct our new id.
            // because it starts with the welcome page id sharepoint knows that the parent of our new content type
            // is the welcome page.
            string productPageCTID = Constants.WELCOME_PAGE_ID + "00" + Constants.PRODUCT_PAGE_END_ID;

            if (!root.ContentTypeExistsByName("Product Page")) // if ct not exists
            {
             
                ContentType ct = root.CreateContentType("Product Page", productPageCTID, "OD2");
            }


            if (!root.FieldExistsById(Constants.FIELD_RELEASEDATE_ID.ToGuid()))
            {
                FieldCreationInformation releaseDateFieldInfo = new FieldCreationInformation(FieldType.DateTime)
                {
                    InternalName = "OD2_ReleaseDate",
                    DisplayName = "Release Date",
                    Id = Constants.FIELD_RELEASEDATE_ID.ToGuid(),
                    Group = "OD2"
                };
                root.CreateField(releaseDateFieldInfo);
                root.AddFieldToContentTypeById(productPageCTID, Constants.FIELD_RELEASEDATE_ID);
            }


            if (!root.FieldExistsById(Constants.FIELD_PRODCAT_ID.ToGuid()))
            {
                TermSet ts = ctx.Site.GetDefaultKeywordsTermStore().GetTermSet(Constants.TAXONOMY_PRODUCTCAT_TERMSET_ID.ToGuid());
                ctx.Load(ts);
                ctx.ExecuteQuery();

                TaxonomyFieldCreationInformation prodCatFieldInfo = new TaxonomyFieldCreationInformation()
                {
                    Id = Constants.FIELD_PRODCAT_ID.ToGuid(),
                    InternalName = "OD2_ProdCat",
                    DisplayName = "ProductCategory",
                    Group = "OD2",
                    TaxonomyItem = ts
                };

                root.CreateTaxonomyField(prodCatFieldInfo);
                root.AddFieldToContentTypeById(productPageCTID, Constants.FIELD_PRODCAT_ID);

            }

            if (!root.FieldExistsById(Constants.FIELD_OWNER_ID.ToGuid()))
            {
                FieldCreationInformation ownerFieldInfo = new FieldCreationInformation(FieldType.User)
                {
                    InternalName = "OD2_Owner",
                    DisplayName = "Owner",
                    Id = Constants.FIELD_OWNER_ID.ToGuid(),
                    Group = "OD2"
                };
                root.CreateField(ownerFieldInfo);
                root.AddFieldToContentTypeById(productPageCTID, Constants.FIELD_OWNER_ID);
            }

            // taxonomy keyword.. we will add the hidden note field along with the taxonomykeyword field 
            // so it does not cause any problems.
            root.AddFieldToContentTypeById(productPageCTID, "{1390a86a-23da-45f0-8efe-ef36edadfb39}"); // TaxKeyWord hidden field
            root.AddFieldToContentTypeById(productPageCTID, "{23f27201-bee3-471e-b2e7-b64fd8b7ca38}"); // TaxKeyWord


        }


        public static void CreateProductTaxonomy(ClientContext ctx)
        {
            TermStore store = ctx.Site.GetDefaultKeywordsTermStore();
            TermGroup productCategoryGroup = store.GetTermGroupByName("OD2");
            if (productCategoryGroup == null)
            {
                productCategoryGroup = store.CreateTermGroup("OD2", Constants.TAXONOMY_OD2_GROUP_ID.ToGuid(), "Stuff for od2");
            }


            TermSet ts = store.GetTermSet(Constants.TAXONOMY_PRODUCTCAT_TERMSET_ID.ToGuid());
            ctx.Load(ts);
            ctx.ExecuteQuery();
            // if term store does not exist create a new one. 
            if (ts.ServerObjectIsNull.Value)
            {
                ts = productCategoryGroup.CreateTermSet("Product Category", Constants.TAXONOMY_PRODUCTCAT_TERMSET_ID.ToGuid(), 1033);
                store.CommitAll();
                ctx.Load(ts);
                ctx.ExecuteQuery();
                ts.CreateTerm("Prod Cat 1", 1033, Guid.NewGuid());
                ts.CreateTerm("Prod Cat 2", 1033, Guid.NewGuid());
                ts.CreateTerm("Prod Cat 3", 1033, Guid.NewGuid());
                ts.CreateTerm("Prod Cat 4", 1033, Guid.NewGuid());

                store.CommitAll();
                ctx.ExecuteQuery();
            }




        }




    }


}
