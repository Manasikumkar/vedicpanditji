<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | VedicPanditji</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #242321;
            background: #FBF7F0;
            margin: 0;
            padding: 30px 16px;
          }
          .container {
            max-width: 1180px;
            margin: 0 auto;
            background: #FFFFFF;
            border: 1px solid #EAE5D9;
            border-radius: 14px;
            padding: 36px 32px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          }
          .header-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }
          .logo-text {
            font-size: 24px;
            font-weight: 800;
            color: #BD4B23;
          }
          .logo-tag {
            color: #242321;
          }
          h1 {
            color: #1A1613;
            font-size: 26px;
            margin: 0 0 10px 0;
            font-weight: 700;
          }
          p.desc {
            color: #706C65;
            font-size: 14px;
            line-height: 1.6;
            margin: 0 0 20px 0;
          }
          .badge-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 24px;
          }
          .badge {
            background: #FAF8F4;
            border: 1px solid #EAE5D9;
            color: #BD4B23;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-top: 10px;
          }
          th {
            background: #F6F1E8;
            color: #1A1613;
            text-align: left;
            padding: 12px 14px;
            font-weight: 700;
            border-bottom: 2px solid #EAE5D9;
          }
          td {
            padding: 11px 14px;
            border-bottom: 1px solid #F0ECE1;
            word-break: break-all;
          }
          tr:hover td {
            background: #FAF8F4;
          }
          a {
            color: #BD4B23;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority, .changefreq, .lastmod {
            white-space: nowrap;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-brand">
            <span class="logo-text">Vedic<span class="logo-tag">Panditji</span></span>
          </div>
          <h1>VedicPanditji XML Sitemap</h1>
          <p class="desc">
            This XML Sitemap is generated for search engines (Google, Bing) to discover and crawl all canonical public URLs and multilingual alternates.
          </p>
          <div class="badge-row">
            <div class="badge">
              Total Canonical URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </div>
            <div class="badge">
              Languages: English, Hindi (हिन्दी), Marathi (मराठी)
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th width="58%">URL</th>
                <th width="12%">Priority</th>
                <th width="15%">Change Frequency</th>
                <th width="15%">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="priority">
                    <xsl:value-of select="sitemap:priority"/>
                  </td>
                  <td class="changefreq">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td class="lastmod">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

