from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.http import *
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from django.template import RequestContext
from ipware.ip import get_real_ip
from subprocess import Popen, PIPE
from subprocess import  call
from django.http import HttpResponse
from ctypes import get_errno
from .models import Choice, Question
import json 
import socket
import datetime
import time
import subprocess
import StringIO
import csv
import urllib2
import xml.etree.cElementTree as ET
import sys
import errno, os
import time
import fcntl

from os.path import expanduser
home = expanduser("~")
data_root = '%s/d_rulebender_data' % home
util_root = data_root + '/d_utilities'


class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)


class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.filter(
            pub_date__lte=timezone.now()
        ).order_by('-pub_date')[:5]

""" ------------- SECOND UPLOAD OF DATA --------------------------- """
""" This anticipates a session key in the first line of the file """
""" This anticipates a model name in the second line of the file """
""" This anticipates zero parameters """
def zero_key(request,python_map_type):
    global util_root
    global data_root

    print('  ')
    print('  ')
    print('  ')
    print('---------------- Calling zero_key -------------------------')

    x_bngl = request.POST['client_response']

    key_end = x_bngl.find("\n")
    x_session = x_bngl[0:key_end]

    name_end = x_bngl.find("\n",key_end+1)
    x_name   = x_bngl[key_end+1:name_end]
    x_bngl   = x_bngl[name_end+1:]


    print (" zero_key   x_name = " + x_name)
    # Hmmm...  There's no longer a need to speculate on what the correct
    # month is.
    p = Popen('date "+%m"', shell=True, stdout=PIPE, stderr=PIPE)
    y_month   = p.stdout.read().strip()
    p = Popen(home + '/d_rulebender_data/d_utilities/s_get_month  ' +
              y_month + '  ' + x_session, shell=True, stdout=PIPE, 
              stderr=PIPE)
    x_month   = p.stdout.read().strip()
    if x_month == 'not_found':
        return zero_no_key(request,python_map_type)
    else:
        # Do we need dir_head ?
        results_head = home + "/d_rulebender_data/" \
                   + x_month + "/" + x_session + "/d_results"

        # The working directory will have a name that is based on the date.
        working_dir = getCurrentWorkDir(x_session)
        if working_dir == 'not_found':
           working_dir = createOutputDirectory(results_head,"next")

        # If there's any important activity, create new directory.
        if os.path.isfile(working_dir + "/non_parse_activity.txt"):
           print(" Creating new directory ")
           working_dir = createOutputDirectory(results_head,"next")

        data_head = working_dir + "/input_file.bngl"
        file = open(data_head, "w")
        file.write(x_bngl)
        file.close()

        full_tag = getFullTag(results_head)
        print(" full_tag: " + full_tag)
        

        print("Calling zero_key driver")
        util_script = util_root + "/s_driver"
        os.system(util_script + " " + x_month + " " + x_session + " " + \
           full_tag + " " + python_map_type)


        lindex = getIndex(results_head)
        ltag   = getTag(results_head)
        time_cpu     = 0.0
        time_elapsed = 0.0
        dir_head = data_root + "/" + x_month + "/" + x_session
        loadTrackingData(dir_head,x_name,time_cpu,time_elapsed, \
           python_map_type,ltag,lindex)


        y_bngl = ' dummy content '
        """
         Let's not worry about this now.  
        """ 
        con_head = dir_head + "/d_results/" + full_tag + "/d_work"
        result_file =  con_head + "/layout_elements.txt" 
        file = open(result_file, "r")
        y_bngl = file.read()
        file.close()

        z_bngl = y_bngl + "    \n      session_key_51937      \n   " + x_session
        return HttpResponse(z_bngl, content_type='text/plain')


def pmap(request):
    if request.POST.has_key('client_response'):
        return zero_no_key(request,"ruleviz_pattern") 
    else:
        template_name = 'polls/index.html'

def cmap(request):
    if request.POST.has_key('client_response'):
        return zero_no_key(request,"contactmap") 
    else:
        template_name = 'polls/index.html'

def cone(request):
    if request.POST.has_key('client_response'):
        return zero_no_key(request,"ruleviz_operation_one") 
    else:
        template_name = 'polls/index.html'

def parse(request):
    if request.POST.has_key('client_response'):
        return zero_no_key(request,"parse") 
    else:
        template_name = 'polls/index.html'

def parse_key(request):
    if request.POST.has_key('client_response'):
        return zero_key(request,"parse") 
    else:
        template_name = 'polls/index.html'

def cmap_key(request):
    if request.POST.has_key('client_response'):
        return zero_key(request,"contactmap") 
    else:
        template_name = 'polls/index.html'

def pmap_key(request):
    if request.POST.has_key('client_response'):
        return zero_key(request,"ruleviz_pattern") 
    else:
        template_name = 'polls/index.html'

def comp_key(request):
    if request.POST.has_key('client_response'):
        return zero_key(request,"ruleviz_operation") 
    else:
        template_name = 'polls/index.html'

def cone_key(request):
    if request.POST.has_key('client_response'):
        return one_key(request,"ruleviz_operation_one") 
    else:
        template_name = 'polls/index.html'

def omap_key(request):
    if request.POST.has_key('client_response'):
        return zero_key(request,"regulatory") 
    else:
        template_name = 'polls/index.html'

def oone_key(request):
    if request.POST.has_key('client_response'):
        return one_key(request,"regulatory_one") 
    else:
        template_name = 'polls/index.html'


""" ------------- SECOND UPLOAD OF DATA --------------------------- """
""" This anticipates a session key in the first line of the file """
""" This anticipates a model name in the second line of the file """
""" This anticipates one parameter in the third line """
def one_key(request,python_map_type):

    print('  ')
    print('  ')
    print('  ')
    print('---------------- Calling one_key -------------------------')

    x_bngl = request.POST['client_response']

    key_end = x_bngl.find("\n")
    x_session = x_bngl[0:key_end]

    name_end = x_bngl.find("\n",key_end+1)
    x_name   = x_bngl[key_end+1:name_end]

    aux_end   = x_bngl.find("\n",name_end+1)
    aux_value = x_bngl[name_end+1:aux_end]

    x_bngl   = x_bngl[aux_end+1:]
  
    """ 
    file = open("/home/roc60/d_contactmap/session.txt", "w")
    file.write(x_bngl)
    file.close()
    """ 

    p = Popen('date "+%m"', shell=True, stdout=PIPE, stderr=PIPE)
    y_month   = p.stdout.read().strip()
    p = Popen(home + '/d_rulebender_data/d_utilities/s_get_month  ' +
              y_month + '  ' + x_session, shell=True, stdout=PIPE, 
              stderr=PIPE)
    x_month   = p.stdout.read().strip()
    if x_month == 'not_found':
        y_bngl = 'Request for one_no_key() not yet implemented.'
    else:
        """ Create director for this data set. """
        # Do we need dir_head ?
        results_head = home + "/d_rulebender_data/" \
                   + x_month + "/" + x_session + "/d_results"

        # The working directory will have a name that is based on the date.
        working_dir = getCurrentWorkDir(x_session)
        if working_dir == 'not_found':
           working_dir = createOutputDirectory(results_head,"next")

        # If there's any important activity, create new directory.
        if os.path.isfile(working_dir + "/non_parse_activity.txt"):
           print(" Creating new directory ")
           working_dir = createOutputDirectory(results_head,"next")

        data_head = working_dir + "/input_file.bngl"
        file = open(data_head, "w")
        file.write(x_bngl)
        file.close()



        full_tag = getFullTag(results_head)
        print(" full_tag: " + full_tag)
        

        print("Calling zero_key driver")
        util_script = util_root + "/s_driver"
        os.system(util_script + " " + x_month + " " + x_session + " " + \
           full_tag + " " + python_map_type + " " + aux_value)


        lindex = getIndex(results_head)
        ltag   = getTag(results_head)
        time_cpu     = 0.0
        time_elapsed = 0.0
        dir_head = data_root + "/" + x_month + "/" + x_session
        loadTrackingData(dir_head,x_name,time_cpu,time_elapsed, \
           python_map_type,ltag,lindex)


        y_bngl = ' dummy content '
        """
         Let's not worry about this now.  
        """ 
        con_head = dir_head + "/d_results/" + full_tag + "/d_work"
        result_file =  con_head + "/layout_elements.txt" 
        file = open(result_file, "r")
        y_bngl = file.read()
        file.close()

        z_bngl = y_bngl + "    \n      session_key_51937      \n   " + x_session
        return HttpResponse(z_bngl, content_type='text/plain')





def pone_key(request):
    if request.POST.has_key('client_response'):
        return one_key(request,'ruleviz_pattern_one')
    else:
        template_name = 'polls/index.html'


""" ------------- FIRST UPLOAD OF DATA --------------------------- """
""" This does not anticipate a session key at the head of the file """
""" It does expect a model name at the head of the file """
""" Instead, it creates a session key, and sends it back """
def zero_no_key(request,python_map_type):
    global util_root

    print('  ')
    print('  ')
    print('  ')
    print('---------------- Calling zero_no_key -------------------------')
    print('----------------' + python_map_type + '-----------------------')
    if request.POST.has_key('client_response'):
        x_bngl = request.POST['client_response']

        # Recover the header, which is the first line of the file.
        name_end = x_bngl.find("\n")
        x_name   = x_bngl[0:name_end]
        x_bngl   = x_bngl[name_end+1:]


        # Generate a session key.
        dir(request.session)
        x_session = request.session._get_or_create_session_key()
        # Elsewhere in this script there's a better way to get the month
        p = Popen('date "+%m"', shell=True, stdout=PIPE, stderr=PIPE)
        x_month   = p.stdout.read().strip()
        dir_head = home + "/d_rulebender_data/" + x_month + "/" + x_session
      

        """ Create directory for this data set. """
        sysy_head = "mkdir " + dir_head
        os.system(sysy_head)

        # Create output directory
        results_head = dir_head + "/d_results"
        sysy_head = "mkdir " + results_head 
        os.system(sysy_head)

        # Create tracking directory
        tracking_head = dir_head + "/d_tracking"
        sysy_head = "mkdir " + tracking_head 
        os.system(sysy_head)



        working_dir = getCurrentWorkDir(x_session)
        if working_dir == 'not_found':
           working_dir = createOutputDirectory(results_head,"first")

        # If there's any important activity, create new directory.
        if os.path.isfile(working_dir + "/non_parse_activity.txt"):
           working_dir = createOutputDirectory(results_head,"next")

        # No lock needed here. This data gets stored just once.
        storeCreationData(request,x_session,python_map_type,x_month)

        # Lock the file lock, and load information about user.  This data
        # gets stored only once.
        lockAndLoad(x_session,x_month)

        # Load the data 
        data_file = working_dir + "/input_file.bngl"
        file = open(data_file, "w")
        file.write(x_bngl)
        file.close()

        full_tag = getFullTag(results_head)
        print(" full_tag: " + full_tag)
        
        print("Calling zero_key driver ")
        util_script = util_root + "/s_driver"
        os.system(util_script + " " + x_month + " " + x_session + " " + \
           full_tag + " " + python_map_type)

        print(" Dont forget to capture CPU and elapsed time.")


        print("  Here x_name = " + x_name)
        lindex = getIndex(results_head)
        ltag   = getTag(results_head)
        time_cpu     = 0.0
        time_elapsed = 0.0
        loadTrackingData(dir_head,x_name,time_cpu,time_elapsed, \
           python_map_type,ltag,lindex)


        result_dir  =  getCurrentWorkDir(x_session)
        result_file =  result_dir + "/layout_elements.txt"
        y_bngl = ' Dummy results '


        print(" Dont forget to capture the results of the run")
        print(" check to see if the results file exists ")
        file = open(result_file, "r")
        y_bngl = file.read()
        file.close()


        z_bngl = y_bngl + "    \n    session_key_51937      \n   " + x_session
        return HttpResponse(z_bngl, content_type='text/plain')
    else:
        template_name = 'polls/index.html'




class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'



class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'

    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())



def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didnt select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))


# #########################################################################
#   Load Visitor DataBase.
#   The information being stored here is stored just once, and it is 
# stored in the directory for the corresponding model.  Since there will
# be no contentionn with other models, no file locking is needed.
# #########################################################################
def load_visitor_database(session_key,service_requested,ip_capture_status):
    print(" Calling  load_visitor_database ")
    if ip_capture_status == 'UNSUCCESSFUL':
       ip_stat = 'unsuccessful'
       ip_addr = 'none'
    else:
       ip_stat = 'successful'
       ip_addr = ip_capture_status

    d1 = {
         'session_key':        session_key,
         'ip_capture_status':  ip_stat,
         'ip_address':         ip_addr
         }
    for keys in d1.items():
       print(keys)


    user_raw = urllib2.urlopen('http://ip-api.com/csv/' + ip_addr)
    user_csv = user_raw.read()

    f = StringIO.StringIO(user_csv)
    rdr = csv.reader(f, delimiter=',')
    larry = [100]
    iii = -1
    for row in rdr:
       iii = iii + 1
       larry[iii] = row  # This should only yield one row.

    curly = [100]
    # print(larry[0])
    if larry[0][0] == 'success':
       d2 = {
           'country':              larry[0][1],
           'country_abrev':        larry[0][2],
           'state_abrev':          larry[0][3],
           'state':                larry[0][4],
           'city':                 larry[0][5],
           'zip_code':             larry[0][6],
           'geo_lat':              larry[0][7],
           'geo_lon':              larry[0][8],
           'time_zone':            larry[0][9],
           'location_1':           larry[0][10],
           'location_2':           larry[0][11],
           'location_3':           larry[0][12]
           }
    d1.update(d2)

    now_epoch = '%f' % (time.time())
    now = datetime.datetime.now()
    d3 = {
        'creation_year':   now.year, 
        'creation_month':  now.month, 
        'creation_day':    now.day, 
        'creation_hour':   now.hour, 
        'creation_minute': now.minute,
        'creation_epoch':  now_epoch
        }
    d1.update(d3)


    #  def getCurrentWorkDir(session_key):

    # print('   ')
    # print(json.dumps(d1))
    # print('   ')
    vis_json = getSessionDir(session_key) + "/d_tracking/creation_data.json"
    vis_xml  = getSessionDir(session_key) + "/d_tracking/creation_data.xml"
    ofile = open(vis_json, 'w')
    ofile.write(json.dumps(d1) + "\n")
    ofile.close


    root = ET.Element("root")
    ET.SubElement(root, 'session_key').text       = d1['session_key']
    ET.SubElement(root, 'ip_capture_status').text = d1['ip_capture_status']
    ET.SubElement(root, 'ip_address').text        = d1['ip_address']
    ET.SubElement(root, 'country').text         = d1['country']
    ET.SubElement(root, 'country_abrev').text   = d1['country_abrev']
    ET.SubElement(root, 'state').text           = d1['state']
    ET.SubElement(root, 'state_abrev').text     = d1['state_abrev']
    ET.SubElement(root, 'city').text            = d1['city']
    ET.SubElement(root, 'zip_code').text        = d1['zip_code']
    ET.SubElement(root, 'geo_lat').text         = d1['geo_lat']
    ET.SubElement(root, 'geo_lon').text         = d1['geo_lon']
    ET.SubElement(root, 'time_zone').text       = d1['time_zone']
    ET.SubElement(root, 'location_1').text      = d1['location_1']
    ET.SubElement(root, 'location_2').text      = d1['location_2']
    ET.SubElement(root, 'location_3').text      = d1['location_3']
    ET.SubElement(root, 'creation_year').text   = str(d1['creation_year'])
    ET.SubElement(root, 'creation_month').text  = str(d1['creation_month'])
    ET.SubElement(root, 'creation_day').text    = str(d1['creation_day'])
    ET.SubElement(root, 'creation_hour').text   = str(d1['creation_hour'])
    ET.SubElement(root, 'creation_minute').text = str(d1['creation_minute'])
    ET.SubElement(root, 'creation_epoch').text  = str(d1['creation_epoch'])
    tree = ET.ElementTree(root)
    tree.write(vis_xml)




    """
    print(' WAIT !!  Why is this here ? Remove the call to the parser')

    This call has been moved to the s_driver script.

#   #############  Call the Parser #####################################
#   The third parameter shouldn't be needed.  Idealy the output should go
#   to the second paramater.  It's just one more thing that needs to be
#   checked into.  For now, this setup works.
    month2 = str('%0.2d' % now.month)
    subprocess.call(  \
       '/home/roc60/d_rulebender_data/d_utilities/BNGParser/src/s_doit ' + \
       '/home/roc60/d_rulebender_data/' + month2 + '/' + session_key + \
       '/d_contactmap/input_file.bngl  ' + \
       '/home/roc60/d_rulebender_data/' + month2 + '/' + session_key + \
       '/d_contactmap/input_file.pars.txt  ' + \
       '/home/roc60/d_rulebender_data/' + month2 + '/' + session_key + \
       '/d_contactmap/input_file.err.txt  ' \
       '/home/roc60/d_rulebender_data/' + month2 + '/' + session_key + \
       '/d_contactmap/input_file.sed.txt  ' \
       , shell=True )
    """


    # This will always call  web_stats.py
    # if (os.path.getsize( \
    #    '/home/roc60/d_rulebender_data/' + month2 + '/' + session_key + \
    #    '/d_contactmap/input_file.sed.txt') > -10): \
    #        subprocess.call(  \
    #        'python /home/roc60/d_rulebender_data/d_utilities/web_stats.py', \
    #        shell=True )


 
def updateFile(data,data_vis_full):
    x = open(home + '/d_rulebender_data/d_utilities/lock_data.txt', 'w')
    bval = True
    while bval:
        try:
            fcntl.flock(x, fcntl.LOCK_EX | fcntl.LOCK_NB)
            # print('Got the lock !!')
            with open(data_vis_full, "a") as myfile:
               myfile.write(json.dumps(data) + "\n")
            myfile.close
            fcntl.flock(x, fcntl.LOCK_UN)
            bval = False
        except IOError as e:
        # raise on unrelated IOErrors
            if e.errno != errno.EAGAIN:
                raise
            else:
                time.sleep(0.5)


# ###################################################################
#     The JSON file contains only data that was available at the 
# time that the model was created.  That data never changes.  Data
# that does change, like model_name, model_err, model_err_string,
# time_cpu are all stored in the model directory.
# ###################################################################
# Some of the data about the initial creation of the model goes into
# the directory for the model.  Only the session key goes into a 
# file protected by a standard UNIX file lock.  Some UNIX documentation
# talks about how the file lock should be cleared upon startup, just
# in case a previous failure left the lock in the locked state. I
# haven't found this to be necessary, and in the long run, I believe 
# that the session keys should go into the SQL database anyway. The
# database will have all the needed locking mechanisms.  Along with
# each session key, I believe that the most recent request epoch should
# be loaded.  That way, SQL can be used to create a list of models 
# that were accessed during a given day or week or month or year.
# That'll be a much cleaner design, but we'll stick with ordinary
# data files for now.  
# ###################################################################
def storeCreationData(request,x_session,python_map_type,x_month):
    ip = get_real_ip(request)

   
    if ip is not None:
       load_visitor_database(x_session,python_map_type,ip)
    else:
       load_visitor_database(x_session,python_map_type,"UNSUCCESSFUL")


    """ 
    #  I don't believe that this ip_address file is needed anymore.
    bigname = "/home/roc60/d_rulebender_data/" + x_month + \
    "/" + x_session + "/ip_address.txt" 
    file = open(bigname, "w")
    if ip is not None:
       file.write(str(ip) + "\n")
       # we have a real, public ip address for user
       file.close()
    else:
       file.write("none\n")
       file.close()
    """ 


# ###################################################################
#    Load Tracking Data
# ###################################################################
#   This gets called after every action to record CPU times and other
# information about the run.
# ###################################################################
def loadTrackingData(dir_head,x_name,time_cpu,time_elapsed,action,\
                     date_tag,tag_index):

    data_head = dir_head + "/d_tracking/model_name.txt"
    file = open(data_head, "w")
    print(" Problem name " + x_name)
    file.write(x_name + "\n")
    file.close()

    data_head = dir_head + "/d_tracking/epoch.txt"
    file = open(data_head, "w")
    new_epoch = '%f' % (time.time())
    file.write(new_epoch + "\n")
    file.close()


    data_head = dir_head + "/d_tracking/epoch_list.json"
    file = open(data_head, "a")
    dt = {
         'a_epoch':     new_epoch,
         'a_cpu':       time_cpu,
         'a_elapsed':   time_elapsed,
         'a_action':    action,
         'a_tag':       date_tag,
         'a_tag_index': tag_index
         }
    file.write(json.dumps(dt) + "\n")
    # file.write(new_epoch + "\n")
    file.close()

    
    # After appending the epoch_list.txt file, now read in all
    # The contents of the file for conversion to xml.
    file = open(data_head, 'r')
    qlist = []
    for line in file:
       q = Payload(line.strip())
       qlist.append(q)
    file.close()


    root = ET.Element("root")
    ET.SubElement(root, 'model_name').text = x_name
    ET.SubElement(root, 'cur_epoch').text  = new_epoch
    for ii in range(len(qlist)):
          q = qlist[ii]
          next_name = 'activity' 
          doc = ET.SubElement(root, next_name)
          ET.SubElement(doc, "a_index").text     = str(ii)
          ET.SubElement(doc, "a_tag_index").text = str(q.a_tag_index)
          ET.SubElement(doc, "a_tag").text       = str(q.a_tag)
          ET.SubElement(doc, "a_action").text    = str(q.a_action)
          ET.SubElement(doc, "a_cpu").text       = str(q.a_cpu)
          ET.SubElement(doc, "a_elapsed").text   = str(q.a_elapsed)
          ET.SubElement(doc, "a_epoch").text     = str(q.a_epoch)
    tree = ET.ElementTree(root)
    data_head = dir_head + "/d_tracking/activity.xml"
    tree.write(data_head)

# ######################################################################
#
# ######################################################################
def lockAndLoad(session_key,month):
    #   This is the one and only bit of information that will go into
    # a locked file.
    lnow = datetime.datetime.now()

    dk = { 'key': session_key, 'creation_month': month }
    vis_head = home + '/d_rulebender_data/'
    vis_full = vis_head + "t_" + str(lnow.year) + "_visitors.json"
    updateFile(dk,vis_full)


# ######################################################################
#   Here we are creating the output directory for a specific run 
# (or simulation).  The d_results directory is already assumed to have
# been created.
# ######################################################################

def createOutputDirectory(results_head,sequence):
    tag_file = results_head + '/current_directory.json'

    lnow = datetime.datetime.now()
    l_month2 = str('%0.2d' % lnow.month)
    l_day2   = str('%0.2d' % lnow.day)
    date_tag = str(lnow.year) + "_" + l_month2 + "_" + l_day2


    print(" tag_file is " + tag_file)
    if (sequence == "first"):
       full_tag = date_tag + "_1" 
       dt = { 'date_tag': date_tag, 'tag_index': 1, 'full_tag': full_tag}
    else:
       file = open(tag_file, 'r')
       plist = []
       for line in file:
          q = Payload(line.strip())
          plist.append(q)
       file.close()
       next_index = int(plist[0].tag_index) + 1
       full_tag = date_tag + "_" + str(next_index)
       dt = { 'date_tag': date_tag, 'tag_index': str(next_index), \
          'full_tag': full_tag}

    # Here we overwrite any existing file.
    with open(tag_file, "w") as myfile:
       myfile.write(json.dumps(dt) + "\n")
       myfile.close

    # Create output directory
    tag_head = results_head + "/" + full_tag
    sysy_head = "mkdir " + tag_head 
    os.system(sysy_head)

    # Create work directory
    work_head = tag_head + "/d_work" 
    sysy_head = "mkdir " + work_head 
    os.system(sysy_head)

    return work_head

# ######################################################################
#
# ######################################################################

def getIndex(results_head):
    tag_file = results_head + '/current_directory.json'

    file = open(tag_file, 'r')
    plist = []
    for line in file:
       q = Payload(line.strip())
       plist.append(q)
    file.close()

    return plist[0].tag_index

# ######################################################################
#
# ######################################################################

def getTag(results_head):
    tag_file = results_head + '/current_directory.json'

    file = open(tag_file, 'r')
    plist = []
    for line in file:
       q = Payload(line.strip())
       plist.append(q)
    file.close()

    # dt = { 'date_tag': date_tag, 'tag_index': next_index, \
    #   'full_tag': full_tag}
    return plist[0].date_tag
# ######################################################################
#
# ######################################################################

def getFullTag(results_head):
    tag_file = results_head + '/current_directory.json'
    if os.path.isfile(tag_file):

       file = open(tag_file, 'r')
       plist = []
       for line in file:
          q = Payload(line.strip())
          plist.append(q)
       file.close()

       # dt = { 'date_tag': date_tag, 'tag_index': next_index, \
       #   'full_tag': full_tag}
       return plist[0].full_tag
    else:
       return 'not_found' 

# ######################################################################
#
# ######################################################################

def getCurrentWorkDir(session_key):
    x_dir = getSessionDir(session_key)

    if x_dir == 'not_found':
      return 'not_found'
    else:
       dir_head = x_dir + '/d_results'  
       ft = getFullTag(dir_head) 
       if ft == 'not_found':
          return 'not_found'
       else:
          wd = dir_head + "/" + ft + "/d_work"
          return wd

# ######################################################################
#
# ######################################################################

def getSessionDir(session_key):
    p = Popen('date "+%m"', shell=True, stdout=PIPE, stderr=PIPE)
    y_month   = p.stdout.read().strip()
    p = Popen(home + '/d_rulebender_data/d_utilities/s_get_month  ' +
              y_month + '  ' + session_key, shell=True, stdout=PIPE, 
              stderr=PIPE)
    x_month   = p.stdout.read().strip()


    if x_month == 'not_found':
      return 'not_found'
    else:
       dir_head = home + '/d_rulebender_data/' + x_month + \
          '/' + session_key 
       return dir_head
