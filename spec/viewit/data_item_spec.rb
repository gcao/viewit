require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Viewit::DataItem do
  it "should take a hash and be able to access properties through method invocation" do
    data = Viewit::DataItem.create :a => 1
    data.a.should == Viewit::DataItem.create(1)
  end
  
  it "should take a integer" do
    data = Viewit::DataItem.create 1
    data.class.should == Viewit::DataItem::LiteralData
    data.to_s.should == "1"
  end
  
  it "should take a string" do
    data = Viewit::DataItem.create "a String"
    data.class.should == Viewit::DataItem::LiteralData
    data.to_s.should == "a String"
  end
  
  it "should take a nil" do
    data = Viewit::DataItem.create nil
    data.class.should == Viewit::DataItem::EmptyData
    data.to_s.should == ""
  end
  
  it "EmptyData can be accessed like HashData" do
    data = Viewit::DataItem.create nil
    data.a.should == Viewit::DataItem.create
  end
  
  it "EmptyData can be accessed like ArrayData" do
    data = Viewit::DataItem.create nil
    data[0].should == Viewit::DataItem.create
  end
  
  it "should be able to access hash properties whose value is not defined" do
    data = Viewit::DataItem.create :a => 1
    data.b.class.should == Viewit::DataItem::EmptyData
  end
  
  it "should take an array" do
    data = Viewit::DataItem.create [1,2]
    data.class.should == Viewit::DataItem::ArrayData
    data[0].should == Viewit::DataItem.create(1)
  end
end
