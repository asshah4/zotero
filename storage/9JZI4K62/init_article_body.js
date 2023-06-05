/*
 * $HeadURL:: http://ambraproject.org/svn/ambra/head/ambra/webapp/src/main/webapp/javasc#$
 * $Id: init_article_body.js 7770 2009-07-07 18:51:15Z ssterling $
 *
 * Copyright (c) 2006-2010 by Public Library of Science
 * http://plos.org
 * http://ambraproject.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
dojo.require("dojo.fx");

dojo.addOnLoad(
  function() {
    var almService = new alm();
    var doi = dojo.byId('doi').value;
    var articleDate = dojo.byId('articlePubDate').value;

    if(almService.validateArticleDate(articleDate) && almService.isArticle(doi)) {
      //Make calls to fill in data in the right hand column
      almService.getIDs(doi, setIDsInRHC, setIDsInRHCError);
      almService.getCites(doi, setCitesInRHC, setCitesInRHCError);
      almService.getCounter(doi, setChartDataInRHC, setChartDataInRHCError);
    }
  }
);
