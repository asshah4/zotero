$.mmsEventMappings = {
    //Drop-down menu trigger links
    'li:mmsClassData(dropDownTrigger) a': {
        name: function(el) {
            var trigger = $(el).closest('li:mmsClassData(dropDownTrigger)');
            return (trigger.mmsClassData('dropDownTrigger') == "myNejm") ? 'headerGlobal-myNEJM' : 'headerGlobal-menu';
        },
        params: function(el) {
            var trigger = $(el).closest('li:mmsClassData(dropDownTrigger)');
            return { 'menuTop': trigger.mmsClassData('dropDownTrigger') };
        }
    },

    'dl.filter a': { name: 'zone-searchFilterResults-refinement',
        params: function(el) {
            var newFilter = $(el).attr('href').split('&').pop().split('=');
            var srcFilGrp = newFilter[0];
            var srcFilter = newFilter[1];
            if (srcFilGrp.indexOf('topic') > -1 && srcFilGrp != 'page')  {
                srcFilter = $.trim($(el).text());
                srcFilter = srcFilter.substring(0,srcFilter.indexOf('(')-1);
            }
            return { 'srcFilGrp': srcFilGrp, 'srcFilter': srcFilter}
            }
    },

    'zone-searchFilterResults-submitSearch': {name: 'zone-searchFilterResults-submitSearch',
        params: function() {
            var searchTerm=$('input.searchTerm')[0].value;
            return { 'searchTerm': searchTerm}
        }
     },

    'zone-searchFilterResults-paging': {name: 'zone-searchFilterResults-paging'},

    //Links inside drop-down menus
    'div:mmsClassData(dropDown) a': {
        name: 'headerGlobal-subMenu',
        params: function(el) {
            var dropDown = $(el).closest('div:mmsClassData(dropDown)');
            return { 'menuTop': dropDown.mmsClassData('dropDown') };
        }
    },
    'div:mmsClassData(dropDown) a.cmeexam': {
        name: 'headerGlobal-cme',
        params: function(el) {
            var dropDown = $(el).closest('div:mmsClassData(dropDown)');
            return { 'menuTop': dropDown.mmsClassData('dropDown') };
        }
    },
    //year links in browse archive
    'div.medicalIndexAllYears a.year': {
        name: function(el) {
            var year = $(el)[0].id;
            return 'issueArchive-browseAYear-' + year;
        }
    },
    //Article links inside lists of articles
    '.searchResults a.articleEntry, .searchResults .articleLink a': { name: 'zone-articleList-articleClick' },

    //Links inside footers
    '#footer dd': { name: 'zone-footer-clickLink' },

    //Social networking links in footer
    'a.facebook': { name: 'zone-footer-clickLink-facebook' },
    'a.twitter': { name: 'zone-footer-clickLink-twitter' },
    'a.youTube': { name: 'zone-footer-clickLink-youTube' },
    'a.nowNejmBlog': { name: 'zone-footer-clickLink-nowNejmBlog' },

    //Links inside Medical Meetings Module
    '#medicalMeetingsModule .moduleBody a': { name: 'zone-medicalMeetings-meeting-click' },

    //Medical Meetings Module more link
    '#medicalMeetingsModule .moreMedMtgs a': { name: 'zone-medicalMeetings-moreMedicalMeetings' },

    //IMC user not logged in, play link
    'a.tab-case-playNow-notSignedIn': { name: 'tab-case-playNow-notSignedIn' },
    'a.tab-case-play-notSignedIn': { name: 'tab-case-play-notSignedIn' },

    //IMC user not logged in, play and save link
    'dd.imcTab div#imcPlayBlock div.playAndSave a': { name: 'tab-case-playAndSave-notSignedIn' },
    'a.tab-case-playAndSave-notSignedIn': { name: 'tab-case-playAndSave-notSignedIn' },


    //IMC user logged in, play link
    'dd.imcTab div.section div.play a': { name: 'tab-case-play-signedIn' },

    //IMC feedback link
    'dd.imcTab a.feedback': { name: 'tab-case-feedback' },

    //IMC survey link
    'dd.imcTab a.survey': { name: 'tab-case-takeSurvey' },

    //IMC See All IMC link
    'dd.imcTab a.moreImcCases': { name: 'tab-case-seeAllIMC' },

    //sign in, speccollsignin is for special collection gateway
    'a.signin': { name: 'gateway-signIn' },
    'a.signin-open': { name: 'layer-signIn-open' },
    'a.signin-header': { name: 'headerGlobal-signIn' },
    'a.signin-header-open': { name: 'layer-signIn-open' },
    'a.speccollsignin': {name: 'myNEJM-gateway-specColl-signIn'},
    'a.cmeexam': {name: 'headerGlobal-cme'},
    'a.headerGlobal-cme': {name: 'headerGlobal-cme'},

     //cme disclosure
    'p.examCancel': {name: 'cmeDisclosure-cancel',
    	params: function(el) {
    		
    		var alink = $(el).find('a:first');
    		var doi = $(alink).attr('rel');
    		doi = unescape(doi);
    		return {'doi': doi };
        }
    
    },
    'p.continueToExam': {name: 'cmeDisclosure-continue',
    	params: function(el) {

    		var alink = $(el).find('a:first');
    		var doi = $(alink).attr('href').split("doi=")[1];
    		doi = unescape(doi);
    		console.log('element doi'+doi);
    		return {'doi': doi };
        }	
    },
    'a.articleTakeExam' : {name: 'cme-article-takeExam'},
    'p.checkAnswer' : {name: 'cmeExam-checkAnswers'},
    
    //sign out
    'a.signout': { name: 'headerGlobal-signOut' },

    //subscribe
    'a.subscribe': { name: 'headerGlobal-subscribe' },

    //renew
    'a.renew': { name: 'headerGlobal-renew' },

    //create account, speccollcreateAccount is for special collection gateway, 
    'a.createAccount': { name: 'headerGlobal-createAccount' },
    'a.signinpagecreateAccount': { name: 'signin-page-createAccount' },
    'a.speccollcreateAccount': { name: 'myNEJM-gateway-specColl-createAccount' },
    

    //extlinks in citations
    'a.extLink': { name: 'tab-reference-nonNEJMLink' },

    //link to article from abstract, mutliple sections
    'a#Methods': { name: 'tab-abstract-fullTextMethods' },
    'a#Results': { name: 'tab-abstract-fullTextResults' },
    'a#Background': { name: 'tab-abstract-fullTextBackground' },
    'a#Discussion': { name: 'tab-abstract-fullTextDiscussion' },
    'a#Top': { name: 'tab-abstract-readFullArticle' },

    //search submit
    '.searchSubmit': { name: 'headerGlobal-submitSearch',
                            params: function() {
                                var searchTerms = $('input#sli_search_1').val();
                                return { 'searchTerm': searchTerms };
                            }
     },

    '.fullIssuePDF': { name: 'issueArchive-fullIssuePDF',
                            params: function(el) {
                                var x = document.getElementById("eventData");
                                var pubDate = new Date();

                                return { 'issDate': x.innerHTML , 'pdfType': x.title};
                            }
     },
    '.coverAndAdvertistingPDF': { name: 'issueArchive-coverAndAdvertistingPDF',
                            params: function(el) {
                                var x = document.getElementById("eventData");

                                return { 'issDate': x.innerHTML , 'pdfType': x.title};
                            }
     },
     '.openPDFIssue': { name: 'issuePDF-openPDF',
                            params: function(el) {
                                var x = document.getElementById("eventData");

                                return { 'issDate': x.innerHTML, 'pdfType':x.title};
                            }
     },
     '.issuePdfBox': { name: 'zone-tools-issuePdf',
                            params: function(el) {
                                var x = document.getElementById("eventData");

                                return { 'issDate': x.innerHTML, 'pdfType':x.title};
                            }
     },
     '.tocLearnAboutArchive': { name: 'issueArchive-learnAboutArchive' },

     '.continueBtn': { name: 'layer-forgotPassword-continue' },

    //advanced Search
    'a.advSearch': { name: 'headerGlobal-searchAdvanced' },

     //links to topic browse (e.g. from article right rail or abstract
    'a.articleActivity-citedby': { name: 'zone-articleActivity-click' },
    'a.zone-careerCenter-job-click': { name: 'zone-careerCenter-job-click' },
    'a.zone-careerCenter-morePhysicianJobs': { name: 'zone-careerCenter-morePhysicianJobs' },
    'div#topics a': { name: 'zone-topics-textLink' },
    'div#moreIn a': { name: 'zone-more-link' },

    'a.zone-tools-articlePdf': { name:'zone-tools-articlePdf',
                params: function() {
                    var doi = $('a[name=articleTop]').attr('rel');
                    return { 'doi': doi };
                }
    },
    'a.zone-tools-articlePrint': {name:'zone-tools-articlePrint',
                params: function() {
                    var doi = $('meta[name=evt-doiPage]').attr('content');
                    return { 'doi': doi };
                }
    },
    'a.zone-tools-downloadCitation': {name:'zone-tools-downloadCitation',
                params: function() {
                    var doi = $('meta[name=evt-doiPage]').attr('content');
                    return { 'doi': doi };
                }
    },
    'a.zone-tools-slideset': {name:'zone-tools-slideset',
                params: function() {
                    var doi = $('a[name=articleTop]').attr('rel');
                    return { 'doi': doi };
                }
    },
    'a.zone-tools-cme': {name:'zone-tools-cme',
                params: function() {
                    var doi = $('a[name=articleTop]').attr('rel');
                    return { 'doi': doi };
                }
    },
    'a.zone-tools-articleEmail': {name:'zone-tools-articleEmail',
                params: function() {
                    var doi = $('meta[name=evt-doiPage]').attr('content');
                    return { 'doi': doi };
                }
    },
    'a.zone-tools-articleSave': {name:'zone-tools-articleSave',
                params: function() {
                    var doi = $('a[name=articleTop]').attr('rel');
                    return { 'doi': doi };
                }
    },
    'a.zone-tools-issuePDFEmail': {name:'zone-tools-articleEmail',
                params: function() {
                    var coverDate = $('#coverDateInput').val();
                    return { 'issdate': coverDate };
                }
    },
    'a.zone-tools-issuePDFSave': {name:'zone-tools-articleSave',
                params: function() {
                    var coverDate = $('#coverDateInput').val();
                    return { 'issdate': coverDate };
                }
    },
    'a.zone-tools-articleEmailAlert': {name:'zone-tools-articleEmailAlert',
                params: function() {
                    var doi = $('a[name=articleTop]').attr('rel');
                    return { 'issdate': doi };
                }
    },
    'a.zone-tools-submitALetter': {name:'zone-tools-submitALetter',
                params: function() {
                    var doi = $('a[name=articleTop]').attr('rel');
                    return { 'doi': doi };
                }
    },
    'a.zone-tools-reprintsPermissions': {name:'zone-tools-reprintsPermissions',
                params: function() {
                    var doi = $('a[name=articleTop]').attr('rel');
                    return { 'doi': doi };
                }
    },
	'#toolsBox a.zone-tools-share-click': {name:'zone-tools-share-click',
		params: function() {
			var doi = $("meta[name= evt-doiPage]").attr("content");
			return { 'doi': doi };
		}
	},
    'a.examContinue' : { name : 'cmeDisclosure-continue',
                params: function() {
                    var doi = $('a.examContinue').attr('rel');
                    doi = unescape(doi);
                    return { 'doi': doi };
                }
     },
     'a.examCancel' : { name : 'cmeDisclosure-cancel',
                params: function() {
                    var doi = $('a.examCancel').attr('rel');
                    doi = unescape(doi);
                    return { 'doi': doi };
                }
     },
    '.examSubmit' : { name : 'cmeExam-submitAnswers',
                params: function() {
                    var doi = $('input[name=doi]').val();
                    return { 'doi': doi };
                }
     },
    'div.answer a.more': { name: 'cmeExam-relatedText' },
    'a.cme-viewCertificate-disabled' : {name: 'cmeExam-examCertificateLayer',
                params: function(el) {
                    var doi = $(el).attr('href').split("doi=")[1];
                    doi = unescape(doi);
                    return {'doi': doi };
                }
     },
    'a.cme-examEval-disabled' : { name: 'cmeExam-examEvaluationLayer',
                params: function(el) {
                    var doi = $(el).attr('href').split("doi=")[1];
                    return {'doi': doi };
                }
     },
    '.creditSubmit' : { name : 'cmeCreditClaim-submit',
                params: function() {
                    var doi = $('input[name=doi]').val();
                    return { 'doi': doi };
                }
     },

    '#trendsBox p.articleLink a': {name:'zone-trends-link'},
    '#trendsBox p.moreTrends a': {name:'zone-trends-moreTrends'},
    '#relatedContent .articleLink a': {name:'zone-related-articles-link'},
    '#highlightsCarousel .articleLink a': {name:'zone-travelingHP-link'},
    '.jcarousel-control a': {name:'zone-travelingHP-scroll'},
    'a.tab-article-correctionHasBeenPublished': {name:'tab-article-correctionHasBeenPublished'},
    'a.tab-article-retractionHasBeenPublished': {name:'tab-article-retractionHasBeenPublished'},
    'a.toggleRef': {name:'tab-letters-references'},
    'p.authors a.email': {name:'tab-letters-userEmail'},
    'a.issueArchive-recentIssue': {name:'issueArchive-recentIssue'},
    'a.issueArchive-currentIssue-click': {name:'issueArchive-currentIssue-click'},
    'a.issueArchive-browseAllYears': {name:'issueArchive-browseAllYears'},
    'div.articleLink a': {name:'issueArchive-article-click'},
    'page-medicalIndexAllYears': {name:'issueArchive-browseAllYears'},
    'ul.foundIssuesByYear li dd a': {name:'issueArchive-issue-click'},
    'a.articleThumb': {name:'tab-article-thumbnail'},
    'a.articleThumbMedia': {name:'zone-mediaInThisArticle-thumbnail'},

    'a.table-slide': {name: 'table-slide',
                params: function(el) {
                    var id =  $(el).attr('id').replace("slideLink","");
                    var doi = $('a[name=articleTop]').attr('rel');
                    return  { 'id':id, 'doi':doi };
                }
     },
    'a.figure-slide': {name: 'figure-slide',
                params: function(el) {
                    var id =  $(el).attr('id').replace("slideLink","");
                    var doi = $('a[name=articleTop]').attr('rel');
                    return  { 'id':id, 'doi':doi };
                }
      },

    //sign in layer
    'a.lyrForgotPwd': { name : 'layer-signIn-forgotYourPassword-Link' },    
    'a.lyrForgotPwd-open': { name : 'layer-forgotPassword-open' },
    'a.loginAthens': { name : 'layer-signIn-signInAthensOrInstitution' },
    '#btnSignIn': { name : 'layer-signIn-submitSignIn' },    
    '#savePassword' : { name : 'layer-signIn-rememberMeToggle' },    
    'openSignIn' : { name : 'layer-signIn-open' },
    
    //CDF sign in layer
    'a.cdfLyrForgotPwd': { name : 'cdf-signinLayer-forgotYourPassword-Link' },
    '#cdfBtnSignIn': { name : 'cdf-signinLayer-submit' },
    '#cdfSavePassword' : { name : 'cdf-signinLayer-rememberMeToggle' },
    'cdfOpenSignIn' : { name : 'cdf-signinLayer-open' },
    'cdfOpenForgotPwd': { name : 'cdf-forgotPassword-open' },
    '.cdfContinueBtn': { name: 'cdf-forgotPassword-continue' },
    
    'li.downloadVCM a': { name: 'zone-tools-downloadVCM',
                params: function(el) {
                    var vp = $.trim($(el).text());
                    var doi = $('a[name=articleTop]').attr('rel');
                    return { 'vidFormat': vp, 'doi':doi };
                }
     },
    'a.download-mp3': {name: 'zone-tools-audio-download',
                params: function(el) {
                        var doi = $(el).attr('rel');
                        if (doi.indexOf('issue') != -1) {
                            return { 'issueDate': doi.split('/').pop() }
                        }
                        return { 'doi': doi };
                    }              
    },
    'a.audio-download': {  name : 'zone-tools-audio-download',
                    params: function(el) {
                        var doi = $(el).attr('rel');
                        if (doi.indexOf('issue') != -1) {
                            return { 'issueDate': doi.split('/').pop() }
                        }
                        return { 'doi': doi };
                    }
	 },

    'a.zone-tools-audio-listen': {  name : 'zone-tools-audio-listen',
                    params: function(el) {
                        var doi = $(el).attr('rel');
                        if (doi.indexOf('issue') != -1) {
                            return { 'issueDate': doi.split('/').pop() }
                        }
                        return { 'doi': doi };
                    }
	 },

    '.podcastSignup a': { name : 'audio-podcastSignup',
                params: function() {
                    var id = $('.audioPlayer').attr('id');
                    return { 'id': id };
                }
     },
    'a.tab-case-play-signedIn-open': {name: 'tab-case-play-signedIn ' },

    '.hover li.downloadPDF a': { name: 'article-hover-pdf',
                params: function(el) {
                    var doi = $(el).attr('href').replace('/doi/pdf/','');
                    return { 'doi': doi }
                }
    },
    'a.hoverSavePage': { name: 'article-hover-save',
                params: function() {
					var targetLink = $(this).attr('class');;
					console.log(targetLink);
					var doi = $('.hover a.event-hoverSavePage').attr('href').split('doi=')[1];
                    return { 'doi': doi.replace('%2F','/')}
                }
    },
    'a.cmePDF': { name: 'download-cmePdf',
                params: function() {
                   var doi = $('input[name=doi]').val();
                   return { 'doi': doi };
                }
    },
    'a.cmeFullArticle': { name: 'cmeExam-fullText',
                params: function() {
                   var doi = $('input[name=doi]').val();
                   return { 'doi': doi };
                }
    },
    '#topNav li.cmeButton a' : { name: 'headerglobal-cme'},

    //'': {name:''},
//'': {name:''},
//'': {name:''},
//'': {name:''},
//'': {name:''},
//'': {name:''},

    //Tab-panel tabs
    '.tabPanel dt': {
        name: function(el) {
            var type = $.mmsEventMappings.tabClicked ? 'click' : 'initial';
            $.mmsEventMappings.tabClicked = true;
            return 'tab-' + $(el).text().replace(' ','').replace(' ','').replace(' ','').replace(' ','') + '-' + type;
        }
    },

    'a.viewClass-Suppl': { name:'zone-tools-supplementaryMaterials',
        params: function() {
            var doi = $('a[id=supplLink]').attr('rel');
            return { 'doi': doi };
        }
    },

    'a.layer-supplementaryMaterial-supplementaryAppendixPDF': { name:'layer-supplementaryMaterial-supplementaryAppendixPDF',
        params: function() {
            var doi = $('a[id=supplementaryAppendixPDF]').attr('rel');
            return { 'doi': doi };
        }
    },

    'a.layer-supplementaryMaterial-disclosureFormsPDF': { name:'layer-supplementaryMaterial-disclosureFormsPDF',
        params: function() {
            var doi = $('a[id=disclosureFormsPDF]').attr('rel');
            return { 'doi': doi };
        }
    },

    'a.layer-supplementaryMaterial-protocolFormsPDF': { name:'layer-supplementaryMaterial-protocolFormsPDF',
        params: function() {
            var doi = $('a[id=protoclFormsPDF]').attr('rel');
            return { 'doi': doi };
        }
    }
};


